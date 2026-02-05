import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, } from "@dnd-kit/sortable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { GalleryVertical, Image, RectangleHorizontal, RectangleVertical, X, } from "lucide-react";
import UploadImageBtn from "@/components/tool/UploadImageBtn";
import { ChangeEvent, memo, useRef, useState } from "react";
import HiddenFileInput from "@/components/HiddenFileInput";
import { addImagesToPdf, downloadBlob } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { v4 } from "uuid";


type ImageItem = {
  id: string;
  file: File;
  preview: string;
};
const ImageToPdfConverter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"Auto" | "Letter" | "A4">("A4");
  const [orientation, setOrientation] = useState("portrait");
  const [margin, setMargin] = useState(20);
  const [loading, setLoading] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const openExplorer = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: v4(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemoveFile = (e: string) => {
    if (files?.length) {
      setFiles(files.filter((item) => item.id !== e));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleConvertImages = async () => {
    try {
      setLoading(true);
      let pdf = await addImagesToPdf(files, pageSize, orientation, margin);
      downloadBlob(pdf);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        multiple={true}
        accept="image/png,image/jpeg"
        onChange={handleFilesOnChange}
      />
      {files.length ? (
        <Card className="grid grid-cols-12 overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="col-span-8 border-r bg-gray-50 min-h-[70vh] max-h-[80vh] overflow-y-auto p-5 grid grid-cols-3 gap-4">
              <SortableContext
                disabled={files?.length < 2}
                items={files.map((file) => file.id)}
                strategy={rectSortingStrategy}
              >
                {files.map((item) => (
                  <SortableImageItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemoveFile(item.id)}
                  />
                ))}
              </SortableContext>
            </div>
            <div className="col-span-4 p-5 flex flex-col gap-4">
              <div className="space-y-1">
                <span>
                  <b>Page orientation</b>
                </span>
                <div className="grid grid-cols-2 gap-3 items-center justify-center">
                  <div
                    onClick={() => setOrientation("landscape")}
                    className={`cursor-pointer border rounded-md flex flex-col items-center justify-center h-24 ${
                      orientation === "landscape"
                        ? "border-2 border-primary"
                        : ""
                    }`}
                  >
                    <RectangleHorizontal size={40} />
                    <span>Landscape</span>
                  </div>
                  <div
                    onClick={() => setOrientation("portrait")}
                    className={`cursor-pointer border rounded-md flex flex-col items-center justify-center h-24 ${
                      orientation === "portrait"
                        ? "border-2 border-primary"
                        : ""
                    }`}
                  >
                    <RectangleVertical size={40} />
                    <span>Potrait</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span>
                  <b>Page size</b>
                </span>
                <Select
                  value={pageSize}
                  onValueChange={(e: "Auto" | "Letter" | "A4") =>
                    setPageSize(e)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Page size">
                      {pageSize}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Auto">Auto</SelectItem>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <span>
                  <b>Margin</b>
                </span>
                <div className="grid grid-cols-3 gap-3 items-center justify-center">
                  <div
                    onClick={() => setMargin(0)}
                    className={`cursor-pointer border rounded-md flex flex-col items-center justify-center h-20 ${
                      margin === 0 ? "border-2 border-primary" : ""
                    }`}
                  >
                    <Image />
                    <span className="text-sm">No margin</span>
                  </div>
                  <div
                    onClick={() => setMargin(10)}
                    className={`cursor-pointer border rounded-md flex flex-col items-center justify-center h-20 ${
                      margin === 10 ? "border-2 border-primary" : ""
                    }`}
                  >
                    <GalleryVertical />
                    <span>10 mm</span>
                  </div>
                  <div
                    onClick={() => setMargin(20)}
                    className={`cursor-pointer border rounded-md flex flex-col items-center justify-center h-20 ${
                      margin === 20 ? "border-2 border-primary" : ""
                    }`}
                  >
                    <GalleryVertical />
                    <span>20 mm</span>
                  </div>
                </div>
              </div>

              <Button
                disabled={loading}
                className="w-full"
                onClick={openExplorer}
              >
                Choose files
              </Button>
              <Button
                className="w-full"
                disabled={loading}
                onClick={handleConvertImages}
              >
                Covert to PDF
              </Button>
            </div>
          </DndContext>
        </Card>
      ) : (
        <UploadImageBtn onClick={openExplorer} />
      )}
    </>
  );
};

function SortableImageItem({
  item,
  onRemove,
}: {
  item: ImageItem;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative group">
      <X
        className="absolute -top-2 -right-2 hidden group-hover:block bg-white shadow border rounded-full p-1 cursor-pointer"
        onClick={onRemove}
      />
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="border rounded-lg h-fit cursor-grab bg-white"
      >
        <div className="flex items-center justify-center h-44">
          <img
            src={item.preview}
            alt={item.file.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <p className="border-t text-sm line-clamp-2 px-2 py-1">
          {item.file.name}
        </p>
      </div>
    </div>
  );
}


export default memo(ImageToPdfConverter);
