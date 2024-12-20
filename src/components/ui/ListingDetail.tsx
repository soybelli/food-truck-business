import React from 'react';
import { X, MapPin, Calendar, Box, CheckCircle2, Activity } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { FoodTruck } from '../../types';

interface ListingDetailProps {
  listing: FoodTruck;
  onClose: () => void;
  onRequestPrice: () => void;
}

export function ListingDetail({ listing, onClose, onRequestPrice }: ListingDetailProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 shadow-md hover:bg-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-[400px] w-full relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {listing.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${listing.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(listing.status)}`}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h2>
            <p className="text-lg text-gray-600">{listing.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Box className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
              <span>{listing.specifications.dimensions}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
              <span>{listing.specifications.year}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Activity className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
              <span>Condition: {listing.specifications.condition}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {listing.specifications.equipment.map((item, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {listing.features.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {listing.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onRequestPrice}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            Request Information
          </button>
        </div>
      </div>
    </div>
  );
}