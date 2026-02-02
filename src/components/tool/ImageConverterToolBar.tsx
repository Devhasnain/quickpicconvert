import { FilterFormats, OutputFormats, useImageConverterStore, } from "@/store/ImageConverterStore";
import { getImageFilterLabel, getOutputFormateLabel } from "@/lib/utils";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { FlipHorizontal2, FlipVertical2 } from "lucide-react";

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, } from "../ui/select";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


type Props = {
  openExplorer?: () => void;
};

const ImageConverterToolBar = ({ openExplorer }: Props) => {
  const {
    previewUrl,
    quality,
    setQuality,
    filter,
    setFilter,
    width,
    setWidth,
    height,
    setHeight,
    enableResize,
    setEnableResize,
    setOutputFormat,
    outputFormat,
    loading,
    resetToDefault,
    toggleFlipX,
    toggleFlipY,
    autoOptimizeForWeb,
    rotation,
    setRotation,
  } = useImageConverterStore();

  const [enableRotate, setEnableRotate] = useState(false);
  const toggleRotate = useCallback(() => {
    setEnableRotate(!enableRotate);
  }, [enableRotate]);

  const handleChangeQuality = useCallback(
    (value: number[]) => {
      setQuality(Number(value));
    },
    [quality]
  );

  const handleChangeOutput = useCallback(
    (value: OutputFormats) => {
      setOutputFormat(value);
    },
    [outputFormat]
  );

  const handleChangeFilter = useCallback(
    (value: FilterFormats) => {
      setFilter(value);
    },
    [filter]
  );

  const handleToggleResize = useCallback(
    (e: boolean) => {
      setEnableResize(e);
    },
    [enableResize]
  );

  const handleResizeOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "height") setHeight(+e.target.value);
      if (e.target.name === "width") setWidth(+e.target.value);
    },
    [height, width]
  );
  return (
    <div className="w-full lg:w-3/12 h-full lg:rounded-tl-3xl lg:rounded-bl-3xl bg-white/40 z-10 p-6 flex flex-col gap-4 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <Label>
          <b>Quality:</b> {Math.round(quality * 100)}%
        </Label>
        <Slider
          disabled={!previewUrl || loading}
          value={[quality]}
          onValueChange={handleChangeQuality}
          min={0.4}
          max={1}
          step={0.05}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>
          <b>Output formate</b>
        </Label>
        <Select
          disabled={!previewUrl || loading}
          value={outputFormat}
          onValueChange={handleChangeOutput}
        >
          <SelectTrigger>
            <SelectValue placeholder="Output">
              {getOutputFormateLabel(outputFormat)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image/webp">WEBP (Best compression)</SelectItem>
            <SelectItem value="image/jpeg">JPEG</SelectItem>
            <SelectItem value="image/png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>
          <b>Filter</b>
        </Label>
        <Select
          disabled={!previewUrl || loading}
          value={filter}
          onValueChange={handleChangeFilter}
        >
          <SelectTrigger>
            <SelectValue>{getImageFilterLabel(filter)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Filter</SelectItem>
            <SelectItem value="grayscale(100%)">Grayscale</SelectItem>
            <SelectItem value="contrast(120%)">Contrast</SelectItem>
            <SelectItem value="brightness(120%)">Brightness</SelectItem>
            <SelectItem value="sepia(100%)">Sepia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="enable-resize-mode">
            <b>Resize</b>
          </Label>
          <Switch
            disabled={loading || !previewUrl}
            checked={enableResize}
            onCheckedChange={handleToggleResize}
          />
        </div>

        {enableResize && (
          <>
            <div className="flex flex-col gap-1">
              <Label className="">
                <b className="!text-sm">Width</b>
              </Label>
              <Input
                disabled={!previewUrl || loading}
                type="number"
                max={1200}
                name="width"
                value={width || 0}
                maxLength={4}
                onChange={handleResizeOnChange}
                placeholder="Width"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>
                <b className="!text-sm">Height</b>
              </Label>
              <Input
                disabled={!previewUrl || loading}
                type="number"
                name="height"
                value={height || 0}
                onChange={handleResizeOnChange}
                placeholder="Height"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="enable-resize-mode">
            <b>Rotate</b>
          </Label>
          <Switch
            disabled={loading || !previewUrl}
            checked={enableRotate}
            onCheckedChange={toggleRotate}
          />
        </div>

        {enableRotate && (
          <>
            <div className="flex flex-col gap-1">
              <Label className="">
                <b className="!text-sm">Rotate</b>
              </Label>
              <div className="flex flex-row items-center gap-3">
              <Button disabled={loading || rotation === 0} onClick={()=>setRotation(0)} size={"icon"} >0</Button>
              <Button disabled={loading || rotation === 45} onClick={()=>setRotation(45)} size={"icon"} >45</Button>
              <Button disabled={loading || rotation === 90} onClick={()=>setRotation(90)} size={"icon"} >90</Button>
              <Button disabled={loading || rotation === 180} onClick={()=>setRotation(180)}size={"icon"} >180</Button>
              <Button disabled={loading || rotation === 270} onClick={()=>setRotation(270)} size={"icon"} >270</Button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="enable-resize-mode">
          <b>Flip</b>
        </Label>
        <div className="flex flex-row items-center gap-3">
          <Button
            disabled={loading || !previewUrl}
            size={"icon"}
            onClick={toggleFlipX}
          >
            <FlipHorizontal2 />
          </Button>
          <Button
            disabled={loading || !previewUrl}
            size={"icon"}
            onClick={toggleFlipY}
          >
            <FlipVertical2 />
          </Button>
        </div>
      </div>
      <Button disabled={loading} onClick={autoOptimizeForWeb}>
        ⚡ Optimize for Web
      </Button>
      <Button disabled={loading} onClick={resetToDefault}>
        Reset changes
      </Button>
      <Button disabled={loading} onClick={openExplorer}>
        Choose different file
      </Button>
    </div>
  );
};

export default memo(ImageConverterToolBar);
