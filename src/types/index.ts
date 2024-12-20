export interface FoodTruck {
  id: string;
  title: string;
  description: string;
  images: string[];
  specifications: {
    dimensions: string;
    equipment: string[];
    year: number;
    condition: string;
  };
  features: string[];
  location: string;
}

export interface LeadForm {
  fullName: string;
  phoneNumber: string;
  email?: string;
  message?: string;
  truckId: string;
}