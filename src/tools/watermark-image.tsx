import { useRef, useState, useEffect, useCallback, ChangeEvent, useMemo, } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import { HiddenFileInput, SelectImageButton } from "@/components";
import { useImageWatermarkStore } from "@/store";
import { Plus, Settings, X } from "lucide-react";
import { WatermarkItem } from "@/types";
import toast from "react-hot-toast";
import Image from "next/image";
import Konva from "konva";


const DEFAULT_WATERMARK_WIDTH_RATIO = 0.25;
const MIN_WATERMARK_SIZE = 20;
const NEW_WATERMARK_CASCADE_STEP = 24;
const CANVAS_AREA_PADDING = 16;

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `wm_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

async function decodeToBitmap(
  file: File
): Promise<{ bitmap: ImageBitmap; url: string }> {
  const bitmap = await createImageBitmap(file);
  const url = URL.createObjectURL(file);
  return { bitmap, url };
}

function getRotatedAABB(
  x: number,
  y: number,
  width: number,
  height: number,
  rotationRad: number
) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const corners = [
    { x: -width / 2, y: -height / 2 },
    { x: width / 2, y: -height / 2 },
    { x: width / 2, y: height / 2 },
    { x: -width / 2, y: height / 2 },
  ].map((p) => ({
    x: cx + p.x * Math.cos(rotationRad) - p.y * Math.sin(rotationRad),
    y: cy + p.x * Math.sin(rotationRad) + p.y * Math.cos(rotationRad),
  }));
  const xs = corners.map((c) => c.x);
  const ys = corners.map((c) => c.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

function toRadians(rotation: number): number {
  return Math.abs(rotation) > Math.PI * 2
    ? (rotation * Math.PI) / 180
    : rotation;
}

export function ImageWatermarkerTool() {
  const {
    backgroundFile,
    backgroundImage,
    setBackground,
    setBackgroundScale,
    waterMarks,
    addWaterMark,
    resetWaterMarks,
    rescaleWatermarks,
    selectedWmId,
    setSelectedWnId,
    removeWaterMark,
    updateWaterMarkSettings,
    backgroundSettings,
  } = useImageWatermarkStore();

  const [openSettings, setOpenSettings] = useState(false)

  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const wmFileInputRef = useRef<HTMLInputElement>(null);

  const [isExporting, setIsExporting] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const nodeRefs = useRef<Map<string, Konva.Image>>(new Map());
  const trRef = useRef<Konva.Transformer>(null);

  const canvasAreaRoRef = useRef<ResizeObserver | null>(null);
  const prevScaleRef = useRef(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const setCanvasAreaRef = useCallback((el: HTMLDivElement | null) => {
    if (canvasAreaRoRef.current) {
      canvasAreaRoRef.current.disconnect();
      canvasAreaRoRef.current = null;
    }
    if (el) {
      const observer = new ResizeObserver(([entry]) => {
        if (!entry) return;
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      });
      observer.observe(el);
      canvasAreaRoRef.current = observer;
    }
  }, []);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageWaterMark.worker", import.meta.url),
      { type: "module" } 
    );
    return () => {
      workerRef.current?.terminate();
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    if (!backgroundImage || !containerSize.width || !containerSize.height)
      return;

    const availW = Math.max(50, containerSize.width - CANVAS_AREA_PADDING);
    const availH = Math.max(50, containerSize.height - CANVAS_AREA_PADDING);
    const naturalW = backgroundSettings.width;
    const naturalH = backgroundSettings.height;
    const newScale = Math.min(1, availW / naturalW, availH / naturalH);

    const prevScale = prevScaleRef.current;
    if (prevScale > 0 && newScale !== prevScale) {
      rescaleWatermarks(newScale / prevScale);
    }

    prevScaleRef.current = newScale;
    if (newScale !== backgroundSettings.scale) {
      setBackgroundScale(newScale);
    }
  }, [
    containerSize,
    backgroundImage,
    backgroundSettings.width,
    backgroundSettings.height,
  ]);

  // attach/detach the Transformer whenever selection changes
  useEffect(() => {
    if (!trRef.current) return;
    const node = selectedWmId
      ? nodeRefs.current.get(selectedWmId) ?? null
      : null;
    trRef.current.nodes(node ? [node] : []);
    trRef.current.getLayer()?.batchDraw();
  }, [selectedWmId, waterMarks.length]);

  const bgDisplayWidth = backgroundImage
    ? backgroundImage.width * backgroundSettings.scale
    : 0;
  const bgDisplayHeight = backgroundImage
    ? backgroundImage.height * backgroundSettings.scale
    : 0;

  const openBgFileExplorer = () => {
    bgFileInputRef.current?.click();
  };

  const openWmFileExplorer = () => {
    wmFileInputRef.current?.click();
  };

  const handleBgSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const promise = toast.promise(decodeToBitmap(file), {
        loading: "Loading image...",
        error: "Unexpected error.",
      });

      promise.then(({ bitmap, url }) => {
        objectUrlsRef.current.push(url);
        prevScaleRef.current = 0; // force a fresh scale calc for the new image

        setBackground({
          file,
          img: bitmap,
          height: bitmap.height,
          width: bitmap.width,
          scale: 1, // placeholder; the resize-observer effect above sets the real value
        });

        resetWaterMarks();
        setSelectedWnId(null);
        nodeRefs.current.clear();
      });
    },
    []
  );

  const handleWmSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !backgroundImage) return; // require a background first

      const promise = toast.promise(decodeToBitmap(file), {
        loading: "Loading watermark...",
        error: "Unexpected error.",
      });

      promise.then(({ bitmap, url }) => {
        objectUrlsRef.current.push(url);

        const aspect = bitmap.height / bitmap.width;

        let wmW = bgDisplayWidth * DEFAULT_WATERMARK_WIDTH_RATIO;
        let wmH = wmW * aspect;

        if (wmH > bgDisplayHeight) {
          wmH = bgDisplayHeight * DEFAULT_WATERMARK_WIDTH_RATIO;
          wmW = wmH / aspect;
        }

        const cascade = (waterMarks.length % 5) * NEW_WATERMARK_CASCADE_STEP;
        const id = makeId();

        addWaterMark({
          id,
          file,
          img: bitmap,
          x: bgDisplayWidth / 2 + cascade,
          y: bgDisplayHeight / 2 + cascade,
          width: wmW,
          height: wmH,
          rotation: 0,
          opacity: 0.6,
        });
      });

      promise.finally(() => {
        if (wmFileInputRef.current) wmFileInputRef.current.value = "";
      });
    },
    [backgroundImage, bgDisplayWidth, bgDisplayHeight, waterMarks.length]
  );

  const handleOpacityChange = useCallback((wm: WatermarkItem) => {
    updateWaterMarkSettings(wm);
  }, []);

  const dragBoundFunc = useCallback(
    function dragBound(this: any, pos: { x: number; y: number }) {
      const width = this.width() * this.scaleX();
      const height = this.height() * this.scaleY();
      const rad = (this.rotation() * Math.PI) / 180;

      const halfW =
        Math.abs((width / 2) * Math.cos(rad)) +
        Math.abs((height / 2) * Math.sin(rad));
      const halfH =
        Math.abs((width / 2) * Math.sin(rad)) +
        Math.abs((height / 2) * Math.cos(rad));

      let minX = halfW;
      let maxX = bgDisplayWidth - halfW;
      let minY = halfH;
      let maxY = bgDisplayHeight - halfH;

      if (minX > maxX) minX = maxX = bgDisplayWidth / 2;
      if (minY > maxY) minY = maxY = bgDisplayHeight / 2;

      return {
        x: Math.min(Math.max(pos.x, minX), maxX),
        y: Math.min(Math.max(pos.y, minY), maxY),
      };
    },
    [bgDisplayWidth, bgDisplayHeight]
  );

  const handleDragEnd = useCallback(
    (wm: WatermarkItem, e: Konva.KonvaEventObject<DragEvent>) => {
      const x = e.target.x();
      const y = e.target.y();
      updateWaterMarkSettings({ ...wm, x, y });
    },
    []
  );

  const transformBoundBoxFunc = useCallback(
    (oldBox: Konva.Box, newBox: Konva.Box): Konva.Box => {
      if (
        newBox.width < MIN_WATERMARK_SIZE ||
        newBox.height < MIN_WATERMARK_SIZE
      ) {
        return oldBox;
      }

      const rad = toRadians(newBox.rotation);
      const aabb = getRotatedAABB(
        newBox.x,
        newBox.y,
        newBox.width,
        newBox.height,
        rad
      );

      if (
        aabb.minX < 0 ||
        aabb.minY < 0 ||
        aabb.maxX > bgDisplayWidth ||
        aabb.maxY > bgDisplayHeight
      ) {
        return oldBox;
      }

      return newBox;
    },
    [bgDisplayWidth, bgDisplayHeight]
  );

  const handleTransformEnd = useCallback((wm: WatermarkItem) => {
    const node = nodeRefs.current.get(wm.id);
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const width = Math.max(MIN_WATERMARK_SIZE, node.width() * scaleX);
    const height = Math.max(MIN_WATERMARK_SIZE, node.height() * scaleY);

    node.offsetX(width / 2);
    node.offsetY(height / 2);

    const x = node.x();
    const y = node.y();
    const rotation = node.rotation();

    updateWaterMarkSettings({
      ...wm,
      width,
      height,
      x,
      y,
      rotation,
    });
  }, []);

  const handleStagePointerDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage();
      const clickedOnEmpty = e.target === stage;
      const clickedOnBackground = e.target.name() === "background";
      if (clickedOnEmpty || clickedOnBackground) {
        setSelectedWnId(null);
      }
    },
    []
  );

  const handleDownload = useCallback(async () => {
    if (!backgroundImage || waterMarks.length === 0 || !workerRef.current)
      return;
    setIsExporting(true);

    try {
      const toNatural = 1 / backgroundSettings.scale;

      const [bgBitmapCopy, ...wmBitmapCopies] = await Promise.all([
        createImageBitmap(backgroundImage),
        ...waterMarks.map((wm) => createImageBitmap(wm.img)),
      ]);

      const watermarkPayload = waterMarks.map((wm, i) => ({
        bitmap: wmBitmapCopies[i],
        centerX: wm.x * toNatural,
        centerY: wm.y * toNatural,
        width: wm.width * toNatural,
        height: wm.height * toNatural,
        rotation: wm.rotation,
        opacity: wm.opacity,
      }));

      const id = Date.now();

      const handleMessage = (e: MessageEvent) => {
        const { type, id: responseId, blob, error } = e.data;
        if (responseId !== id) return;

        if (type === "COMPOSITE_DONE") {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = backgroundFile?.name ?? "watermarked-image.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        } else if (type === "COMPOSITE_ERROR") {
          console.error("Watermark compositing failed:", error);
        }

        setIsExporting(false);
        workerRef.current?.removeEventListener("message", handleMessage);
      };

      workerRef.current.addEventListener("message", handleMessage);
      workerRef.current.postMessage(
        {
          type: "COMPOSITE",
          id,
          payload: {
            bgBitmap: bgBitmapCopy,
            watermarks: watermarkPayload,
            mimeType: "image/png",
          },
        },
        [bgBitmapCopy, ...wmBitmapCopies]
      );
    } catch (err) {
      console.error("Failed to prepare export:", err);
      setIsExporting(false);
    }
  }, [backgroundImage, backgroundFile, waterMarks, backgroundSettings.scale]);

  return (
    <>
      <HiddenFileInput
        onChange={handleBgSelect}
        accept="image/jpeg,image/png"
        multiple={false}
        ref={bgFileInputRef}
      />
      <HiddenFileInput
        onChange={handleWmSelect}
        accept="image/jpeg,image/webp,image/png"
        multiple={false}
        ref={wmFileInputRef}
      />

      <section className="bg-gray-100">
        {backgroundImage ? (
          <div className="min-h-[50vh] sm:h-screen grid grid-cols-1 sm:grid-cols-12 overflow-hidden relative">
            <div
              ref={setCanvasAreaRef}
              className="h-full items-center justify-center overflow-y-auto col-span-full sm:col-span-6 md:col-span-7 2xl:col-span-8 py-5 sm:py-10 flex flex-col"
            >
              <button onClick={()=>setOpenSettings(!openSettings)} className="block sm:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-10 shadow-lg">
                <Settings size={20} />
              </button>
              <Stage
                width={bgDisplayWidth}
                height={bgDisplayHeight}
                onMouseDown={handleStagePointerDown}
                onTouchStart={handleStagePointerDown}
              >
                <Layer>
                  <KonvaImage
                    name="background"
                    image={backgroundImage}
                    width={bgDisplayWidth}
                    height={bgDisplayHeight}
                  />
                  {waterMarks.map((wm) => (
                    <KonvaImage
                      key={wm.id}
                      ref={(node) => {
                        if (node) nodeRefs.current.set(wm.id, node);
                        else nodeRefs.current.delete(wm.id);
                      }}
                      image={wm.img}
                      x={wm.x}
                      y={wm.y}
                      width={wm.width}
                      height={wm.height}
                      offsetX={wm.width / 2}
                      offsetY={wm.height / 2}
                      rotation={wm.rotation}
                      opacity={wm.opacity}
                      draggable
                      dragBoundFunc={dragBoundFunc}
                      onDragEnd={(e) => handleDragEnd(wm, e)}
                      onClick={() => setSelectedWnId(wm.id)}
                      onTap={() => setSelectedWnId(wm.id)}
                      onTransformEnd={() => handleTransformEnd(wm)}
                    />
                  ))}
                  <Transformer
                    ref={trRef}
                    keepRatio
                    enabledAnchors={[
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                    ]}
                    boundBoxFunc={transformBoundBoxFunc}
                  />
                </Layer>
              </Stage>
            </div>

            <div className={`pt-18 sm:pt-3 ${openSettings ? 'col-span-full left-0' : '-left-80 sm:left-0 overflow-hidden'} transition-all duration-300 h-full overflow-y-auto fixed top-0 sm:relative sm:col-span-6 md:col-span-5 2xl:col-span-4 bg-white p-3 sm:p-5 border border-gray-200 space-y-3`}>
              <h2 className="text-xl font-bold pb-0 sm:pb-2">
                Image to Webp Converter
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-500 border-b border-gray-200 mb-4 pb-1.5">
                  Watermark images
                </h3>
                {waterMarks?.length ? (
                  <div className="flex flex-col gap-3 mb-4">
                    {waterMarks.map((wm, i) => (
                      <WaterMarkImageCard
                        key={i}
                        wm={wm}
                        onSelectWm={() => setSelectedWnId(wm.id)}
                        onRemoveWm={() => removeWaterMark(wm.id)}
                        handleOpacityChange={(e) =>
                          handleOpacityChange({
                            ...wm,
                            opacity: parseFloat(e.target.value),
                          })
                        }
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <button
                  onClick={openWmFileExplorer}
                  className="cursor-pointer w-full py-4 px-2 sm:px-6 rounded-xl bg-primary text-white font-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  Add watermark image
                </button>
              </div>

              <div className="space-y-0 sm:space-y-3 flex flex-row items-center justify-center gap-3 sm:flex-col sm:gap-0">
                <button
                  onClick={openBgFileExplorer}
                  className="sm:hidden p-4 flex flex-col text-white rounded-xl items-center justify-center bg-primary"
                >
                  <Plus size={23} />
                </button>

                <button
                  onClick={openBgFileExplorer}
                  className="hidden sm:flex cursor-pointer w-full justify-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  Change background image
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="cursor-pointer w-full py-4 px-2 sm:px-6 rounded-xl bg-primary text-white font-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isExporting ? "Exporting…" : "Download"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <SelectImageButton onClick={openBgFileExplorer} />
        )}
      </section>
    </>
  );
}

type Props = {
  wm: WatermarkItem;
  handleOpacityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectWm: () => void;
  onRemoveWm: () => void;
};
const WaterMarkImageCard = ({
  wm,
  handleOpacityChange,
  onSelectWm,
  onRemoveWm,
}: Props) => {
  const file = useMemo(() => URL?.createObjectURL(wm.file), [wm.file]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden p-2.5 cursor-pointer hover:bg-gray-100">
      <div
        onClick={onSelectWm}
        className="flex flex-row items-center justify-between border-b border-gray-200 pb-3"
      >
        <div className="flex flex-row items-center gap-4">
          <Image
            alt={wm?.file?.name}
            src={file}
            height={50}
            width={50}
            className="rounded-lg"
          />
          <span>{wm?.file?.name}</span>
        </div>
        <button
          onClick={onRemoveWm}
          className="border border-gray-200 rounded-lg p-1.5 hover:bg-white cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      <div className="pt-2">
        <label
          className="flex flex-row items-center justify-between gap-3 md:gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Opacity</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={wm.opacity}
            onChange={handleOpacityChange}
          />
          <span>{Math.round(wm.opacity * 100)}%</span>
        </label>
      </div>
    </div>
  );
};
