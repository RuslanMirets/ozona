import { IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ClearIcon from '@mui/icons-material/Clear';

export const UploadImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((_url) => _url != url));
  };

  const handleChangeFileInput = useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileUrlObj = new Blob([file]);
        setImages((prev) => [...prev, URL.createObjectURL(fileUrlObj)]);
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
      <input ref={inputRef} type="file" id="upload-input" hidden />
      <div className="preview-images">
        {images.map((url, index) => (
          <div className="preview-images__item" key={index}>
            <img src={url} alt="Image" />
            <IconButton onClick={(): void => removeImage(url)} color="primary">
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
