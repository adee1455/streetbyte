export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  preferences?: string[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  address: string;
  cuisineType: string[];
  rating: number;
  images: string[];
  menu: MenuItem[];
  reviews: Review[];
  pno: number;
}

export interface MenuItem {
  id: string;
  image_url: string;
}

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}
