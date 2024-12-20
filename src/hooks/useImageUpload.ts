import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function useImageUpload() {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files: File[]): Promise<string[]> => {
    setLoading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        // Create a unique file name
        const timestamp = new Date().getTime();
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload the file
        const { error: uploadError, data } = await supabase.storage
          .from('listings')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type // Explicitly set content type
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Get the public URL immediately after successful upload
        const { data: { publicUrl } } = supabase.storage
          .from('listings')
          .getPublicUrl(fileName);

        if (publicUrl) {
          uploadedUrls.push(publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        toast.success('Images uploaded successfully');
      }

      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { uploadImages, loading };
}