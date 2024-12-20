import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { FoodTruck } from '../../types';
import { ImageOff, Loader2, MapPin, Calendar, Box, BadgeCheck, Activity } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TruckCardProps {
  truck: FoodTruck;
  onAskPrice: () => void;
  onViewDetails: () => void;
}

export function TruckCard({ truck, onAskPrice, onViewDetails }: TruckCardProps) {
  const [loading, setLoading] = React.useState(true);
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    const preloadImages = async () => {
      const promises = truck.images.map((url, index) => 
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(index);
          img.onerror = () => {
            setImageErrors(prev => ({ ...prev, [index]: true }));
            resolve(index);
          };
          img.src = url;
        })
      );

      await Promise.all(promises);
      setLoading(false);
    };

    preloadImages();
  }, [truck.images]);

  const validImages = truck.images.filter((_, index) => !imageErrors[index]);

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 h-full min-h-[600px]">
        <div className="h-[240px] bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full min-h-[600px] flex flex-col">
      <div className="h-[240px] w-full flex-shrink-0 relative">
        {/* Status Tag - Moved to top left */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(truck.status)}`}>
            {truck.status.charAt(0).toUpperCase() + truck.status.slice(1)}
          </span>
        </div>

        {validImages.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {validImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${truck.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setImageErrors(prev => ({ ...prev, [index]: true }));
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full bg-gray-50 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <ImageOff className="w-12 h-12 mx-auto mb-2" />
              <p>No images available</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">{truck.title}</h3>
          <p className="text-gray-600 leading-relaxed line-clamp-2">{truck.description}</p>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex items-center text-gray-600">
            <Box className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
            <span>{truck.specifications.dimensions}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
            <span>{truck.specifications.year}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
            <span>{truck.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Activity className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
            <span>Condition: {truck.specifications.condition}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onViewDetails}
            className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200"
          >
            See Details
          </button>
          <button
            onClick={onAskPrice}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            Request Price
          </button>
        </div>
      </div>
    </div>
  );
}