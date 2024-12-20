import React from 'react';

interface FeatureImageProps {
  image: string;
  title: string;
  description: string;
}

export function FeatureImage({ image, title, description }: FeatureImageProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-2xl mb-5 shadow-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}