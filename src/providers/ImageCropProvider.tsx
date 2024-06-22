import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import getCroppedImg from "../helpers/cropImage";

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CroppedAreaPixels = Crop | null;

type ImageCropContextType = {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  crop: Crop;
  setCrop: React.Dispatch<React.SetStateAction<Crop>>;
  croppedAreaPixels: CroppedAreaPixels;
  setCroppedAreaPixels: React.Dispatch<React.SetStateAction<CroppedAreaPixels>>;
  onCropComplete: (
    croppedArea: Crop,
    croppedAreaPixels: CroppedAreaPixels
  ) => void;
  getProcessedImage: () => Promise<File | undefined>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleRotateCw: () => void;
  handleRotateAntiCw: () => void;
  max_zoom: number;
  min_zoom: number;
  zoom_step: number;
  max_rotation: number;
  min_rotation: number;
  rotation_step: number;
  resetStates: () => void;
};

const defaultImage = null;
const defaultCrop: Crop = { x: 0, y: 0, width: 0, height: 0 };
const defaultRotation = 0;
const defaultZoom = 1.5;
const defaultCroppedAreaPixels: CroppedAreaPixels = null;

export const ImageCropContext = createContext<ImageCropContextType | undefined>(
  undefined
);

type ImageCropProviderProps = {
  children: ReactNode;
  max_zoom?: number;
  min_zoom?: number;
  zoom_step?: number;
  max_rotation?: number;
  min_rotation?: number;
  rotation_step?: number;
};

const ImageCropProvider: React.FC<ImageCropProviderProps> = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5,
}) => {
  const [image, setImage] = useState<string | null>(defaultImage);
  const [crop, setCrop] = useState<Crop>(defaultCrop);
  const [rotation, setRotation] = useState<number>(defaultRotation);
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels>(
    defaultCroppedAreaPixels
  );

  const onCropComplete = useCallback(
    (_croppedArea: Crop, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2);
    }
  };

  const handleRotateCw = () => {
    setRotation(rotation + rotation_step);
  };

  const handleRotateAntiCw = () => {
    setRotation(rotation - rotation_step);
  };

  const getProcessedImage = async (): Promise<File | undefined> => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      if (croppedImage && croppedImage.file) {
        const imageFile = new File(
          [croppedImage.file as BlobPart],
          `img-${Date.now()}.png`,
          {
            type: "image/png",
          }
        );
        return imageFile;
      }
    }
  };

  const resetStates = () => {
    setImage(defaultImage);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(defaultCroppedAreaPixels);
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateAntiCw,
        handleRotateCw,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
        resetStates,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = (): ImageCropContextType => {
  const context = useContext(ImageCropContext);
  if (!context) {
    throw new Error(
      "useImageCropContext must be used within an ImageCropProvider"
    );
  }
  return context;
};

export default ImageCropProvider;
