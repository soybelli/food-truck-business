import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const { uploadImages, loading } = useImageUpload();
  const [previewErrors, setPreviewErrors] = useState<Set<number>>(new Set());

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const uploadedUrls = await uploadImages(Array.from(files));
    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    setPreviewErrors(prev => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Images</label>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={`${url}-${index}`} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400?text=Failed+to+load';
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <label className={`aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? (
            <>
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <span className="mt-2 text-sm text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      </div>

      <p className="text-sm text-gray-500">
        Supported formats: JPG, PNG, GIF (max 5MB per image)
      </p>
    </div>
  );
}