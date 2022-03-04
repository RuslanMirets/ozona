import { IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { ImageObj } from '../pages/admin';

interface UploadImageProps {
  images: ImageObj[];
  onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadImages: React.FC<UploadImageProps> = ({ images, onChangeImages }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeImage = (url: string) => {
    onChangeImages((prev) => prev.filter((obj) => obj.blobUrl != url));
  };

  const handleChangeFileInput = React.useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileObj = new Blob([file]);
        onChangeImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);

  return (
    <div>
      <IconButton onClick={handleClickImage} color="primary">
        <ImageOutlinedIcon style={{ fontSize: 32 }} />
      </IconButton>
      <input ref={inputRef} type="file" id="upload-input" hidden multiple />
      <div className="preview-images">
        {images.map((obj) => (
          <div className="preview-images__item" key={obj.blobUrl}>
            <img src={obj.blobUrl} alt="Image" />
            <IconButton onClick={(): void => removeImage(obj.blobUrl)} color="primary">
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
