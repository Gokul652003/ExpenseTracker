import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

interface ProfileUploaderModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}
interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const ProfileUploaderModal = ({
  isOpen,
  setIsOpen,
  setProfileImage,
}: ProfileUploaderModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: React.SetStateAction<string | null>) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (image && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels as unknown as Crop);
      setProfileImage(croppedImg);
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-bg px-6 py-10 rounded-2xl shadow-lg flex flex-col gap-3.5 w-[444px]">
          <h1 className="text-center text-2xl font-semibold text-textColor">
            Upload Profile Picture
          </h1>

          <div className="relative w-full h-64 bg-secondary rounded overflow-hidden">
            <Cropper
              image={image ?? ''}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete as ()=>void}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="block w-full text-center px-4 py-2 bg-primary text-textColor rounded cursor-pointer"
            >
              Change Photo
            </label>
          </div>

          <div className="flex gap-4">
            <button
              className="px-10 py-3 bg-border rounded-full text-textColor flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-6 py-3 bg-primary text-white rounded-full"
              onClick={handleSave}
              disabled={!image}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};
