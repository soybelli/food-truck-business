import React, { useState } from 'react';
import { useListings } from '../../hooks/useListings';
import { useListingActions } from '../../hooks/useListingActions';
import { Edit, Trash2, ImageOff } from 'lucide-react';
import { ListingForm } from './ListingForm';
import type { Database } from '../../lib/database.types';

type Listing = Database['public']['Tables']['listings']['Row'];

export function ListingTable() {
  const { listings, loading, error } = useListings();
  const { deleteListing } = useListingActions();
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const success = await deleteListing(id);
      if (success) {
        window.location.reload(); // Refresh to show updated list
      }
    }
  };

  if (editingListing) {
    return (
      <div>
        <button
          onClick={() => setEditingListing(null)}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to listings
        </button>
        <ListingForm initialData={editingListing} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-red-600">
          Error loading listings: {error.message}
        </p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">No listings found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-12 rounded overflow-hidden">
                    {listing.images?.[0] ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {listing.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {listing.description.slice(0, 50)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    listing.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : listing.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setEditingListing(listing)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}