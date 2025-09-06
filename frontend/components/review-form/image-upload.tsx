"use client";

import type React from "react";

import { useRef } from "react";
import { Plus, X } from "lucide-react";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 6,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newImages = [...images, ...selectedFiles].slice(0, maxImages);
    onImagesChange(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        aria-label="Upload images"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
              <img
                src={URL.createObjectURL(image) || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              aria-label={`Remove image ${index + 1}`}
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            aria-label="Add image"
            type="button"
            onClick={handleAddClick}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-orange-300 transition-colors hover:border-orange-400"
          >
            <Plus className="h-8 w-8 text-orange-400" />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {images.length}/{maxImages} images uploaded
      </p>
    </div>
  );
}
