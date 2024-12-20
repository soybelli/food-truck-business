import React, { useState } from 'react';
import { useListings } from '../hooks/useListings';
import { LeadModal } from './LeadModal';
import { TruckCard } from './ui/TruckCard';
import { ListingDetail } from './ui/ListingDetail';

export function Inventory() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [detailTruck, setDetailTruck] = useState<string | null>(null);
  const { listings, loading, error } = useListings();

  const getSelectedListing = (id: string) => {
    return listings.find(listing => listing.id === id);
  };

  if (loading) {
    return (
      <section id="inventory" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="inventory" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Failed to load inventory. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Inventory
        </h2>
        
        {listings.length === 0 ? (
          <p className="text-center text-gray-600">No listings available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((truck) => (
              <TruckCard
                key={truck.id}
                truck={truck}
                onAskPrice={() => setSelectedTruck(truck.id)}
                onViewDetails={() => setDetailTruck(truck.id)}
              />
            ))}
          </div>
        )}
      </div>

      <LeadModal
        isOpen={!!selectedTruck}
        onClose={() => setSelectedTruck(null)}
        truckId={selectedTruck || ''}
      />

      {detailTruck && (
        <ListingDetail
          listing={getSelectedListing(detailTruck)!}
          onClose={() => setDetailTruck(null)}
          onRequestPrice={() => {
            setDetailTruck(null);
            setSelectedTruck(detailTruck);
          }}
        />
      )}
    </section>
  );
}