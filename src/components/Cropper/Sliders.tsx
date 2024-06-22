import { useImageCropContext } from "@/src/providers/ImageCropProvider";
import AddIcon from "@/src/icons/AddIcon";
import RemoveIcon from "@/src/icons/RemoveIcon";
import RotateLeftIcon from "@/src/icons/RotateLeftIcon";
import RotateRightIcon from "@/src/icons/RotateRightIcon";

export const ZoomSlider = () => {
  const {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    max_zoom,
    min_zoom,
    zoom_step,
  } = useImageCropContext();

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="p-1" onClick={handleZoomOut}>
        <span className="sr-only">Zoom Out</span>
        <RemoveIcon />
      </button>
      <input
        type="range"
        name="volju"
        min={min_zoom}
        max={max_zoom}
        step={zoom_step}
        value={zoom}
        onChange={(e) => {
          setZoom(Number(e.target.value));
        }}
        className="accent-primary bg-gray-light h-2 rounded-full appearance-none dark:bg-light"
      />
      <button className="p-1" onClick={handleZoomIn}>
        <span className="sr-only">Zoom In</span>
        <AddIcon />
      </button>
    </div>
  );
};

export const RotationSlider = () => {
  const {
    rotation,
    setRotation,
    max_rotation,
    min_rotation,
    rotation_step,
    handleRotateAntiCw,
    handleRotateCw,
  } = useImageCropContext();

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="p-1" onClick={handleRotateAntiCw}>
        <span className="sr-only">Rotate Left</span>
        <RotateLeftIcon />
      </button>
      <input
        type="range"
        name="volju"
        min={min_rotation}
        max={max_rotation}
        step={rotation_step}
        value={rotation}
        onChange={(e) => {
          setRotation(Number(e.target.value));
        }}
        className="accent-primary bg-gray-light h-2 rounded-full appearance-none dark:bg-light"
      />
      <button className="p-1" onClick={handleRotateCw}>
        <span className="sr-only">Rotate Right</span>
        <RotateRightIcon />
      </button>
    </div>
  );
};
