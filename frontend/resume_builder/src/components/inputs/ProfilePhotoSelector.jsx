import React, { useRef, useState } from "react";
import { FiImage, FiTrash2, FiUpload, FiUser } from "react-icons/fi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ProfilePhotoSelector = ({ value, onChange, error, className = "" }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || "");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Please select an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Image size must be less than 5 MB.");
      return;
    }

    setFileError("");
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange?.(file, imageUrl);
    event.target.value = "";
  };

  const handleRemove = () => {
    setPreview("");
    setFileError("");
    onChange?.(null, "");
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-purple-50 ring-4 ring-purple-50">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <FiUser className="text-purple-600" size={42} strokeWidth={1.5} />
          )}
        </div>

        <button
          type="button"
          aria-label={preview ? "Change profile photo" : "Upload profile photo"}
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white shadow-md transition hover:bg-purple-700"
          onClick={() => inputRef.current?.click()}
        >
          {preview ? <FiImage size={17} /> : <FiUpload size={17} />}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="mt-3 text-sm font-semibold text-purple-600 hover:text-purple-800"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? "Change photo" : "Upload profile photo"}
      </button>

      {preview && (
        <button
          type="button"
          className="mt-1 flex items-center gap-1 text-xs text-gray-500 hover:text-red-600"
          onClick={handleRemove}
        >
          <FiTrash2 size={13} /> Remove photo
        </button>
      )}

      {(fileError || error) && (
        <p className="mt-2 text-center text-xs text-red-600">
          {fileError || error}
        </p>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
