export type ListingCondition = 'New' | 'Excellent' | 'Good' | 'Fair' | 'Needs Work';

export interface ListingSpecifications {
  dimensions: string;
  equipment: string[];
  year: number;
  condition: ListingCondition;
}

export interface ListingFormData {
  title: string;
  description: string;
  images: string[];
  specifications: ListingSpecifications;
  features: string[];
  location: string;
  status: 'available' | 'pending' | 'sold';
}