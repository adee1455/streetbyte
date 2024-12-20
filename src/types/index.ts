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
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
}