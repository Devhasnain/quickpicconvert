import ToolPageLayout from "@/components/tool/ToolPageLayout";
import React, { ChangeEvent, useRef, useState } from "react";


const ColorPicker = () => {
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [color, setColor] = useState<any>(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target) return;
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: any) => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get pixel data
    const pixel: any = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b, a]: any = pixel;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;

    setColor({ r, g, b, a, hex });
  };

  return (
    <ToolPageLayout>

    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onClick={handleCanvasClick}
          style={{ border: "1px solid black", cursor: "crosshair" }}
        />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="preview"
          style={{ display: "none" }}
          onLoad={(e) => {
            const canvas:any = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const img :any= e.target;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          }}
        />
      )}
      {color && (
        <div style={{ marginTop: "10px" }}>
          <div>
            RGB: {color.r}, {color.g}, {color.b}
          </div>
          <div>Hex: {color.hex}</div>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color.hex,
              border: "1px solid #000",
            }}
          />
        </div>
      )}
    </div>
    </ToolPageLayout>

  );
};

export default ColorPicker;
