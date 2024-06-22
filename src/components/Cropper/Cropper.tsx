import React from "react";
import EasyCropper from "react-easy-crop";
import { useImageCropContext } from "@/src/providers/ImageCropProvider";

const Cropper: React.FC = () => {
  const { image, zoom, setZoom, rotation, crop, setCrop, onCropComplete } =
    useImageCropContext();

  return (
    <EasyCropper
      image={image || undefined}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      cropShape="round"
      aspect={1}
      onCropChange={(point) => setCrop((prev) => ({ ...prev, ...point }))}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={false}
      cropSize={{ width: 220, height: 220 }}
      style={{
        containerStyle: {
          borderRadius: 8,
        },
      }}
    />
  );
};

export default Cropper;
