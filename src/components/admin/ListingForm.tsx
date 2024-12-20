import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { SpecificationsForm } from './form/SpecificationsForm';
import { useCreateListing } from '../../hooks/useCreateListing';
import { useListingActions } from '../../hooks/useListingActions';
import type { ListingFormData } from '../../types/listing';
import toast from 'react-hot-toast';

interface ListingFormProps {
  initialData?: ListingFormData;
}

export function ListingForm({ initialData }: ListingFormProps) {
  const [formData, setFormData] = useState<ListingFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    images: initialData?.images || [],
    specifications: initialData?.specifications || {
      dimensions: '',
      equipment: [],
      year: new Date().getFullYear(),
      condition: 'New'
    },
    features: initialData?.features || [],
    location: initialData?.location || '',
    status: initialData?.status || 'available'
  });

  const { createListing, loading: createLoading } = useCreateListing();
  const { updateListing, loading: updateLoading } = useListingActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (initialData?.id) {
        await updateListing(initialData.id, formData);
      } else {
        await createListing(formData);
      }
      window.location.reload();
    } catch (error) {
      toast.error('Failed to save listing');
    }
  };

  const loading = createLoading || updateLoading;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          required
          rows={4}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <ImageUploader
        images={formData.images}
        onChange={(images) => setFormData(prev => ({ ...prev, images }))}
      />

      <SpecificationsForm
        specifications={formData.specifications}
        onChange={(specifications) => setFormData(prev => ({ ...prev, specifications }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Saving...' : initialData ? 'Update Listing' : 'Create Listing'}
      </button>
    </form>
  );
}