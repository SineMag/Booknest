import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageUploader.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { uploadProfilePic } from "../../features/userSlice";

type ImageProps = {
  source?: string | null;
  alt?: string;
  size?: number;
  editable?: boolean;
  onUpload?: (file: File) => void;
};

export default function ImageUploader({
  source = null,
  alt = "Image",
  size = 120,
  editable = true,
  onUpload,
}: ImageProps) {
  const [preview, setPreview] = useState<string | null>(source);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => setPreview(source), [source]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      onUpload?.(file);
      dispatch(uploadProfilePic(file));
    }
  };

  const style = { width: size, height: size, borderRadius: "50%" };

  return (
    <div className={styles.container} style={{ width: size }}>
      <div className={styles.imagePreviewContainer} style={style}>
        {preview ? (
          <img
            src={preview}
            alt={alt}
            className={styles.imagePreview}
            style={style}
          />
        ) : (
          <div className={styles.placeholderImage} style={style}></div>
        )}
      </div>
      {editable && (
        <button
          className={styles.uploadButton}
          onClick={() => inputRef.current?.click()}
        >
          Upload
          <input
            ref={inputRef}
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFile}
            className={styles.hiddenInput}
          />
        </button>
      )}
    </div>
  );
}
