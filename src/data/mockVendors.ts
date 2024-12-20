export interface Vendor {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  hours: string;
  rating: number;
  deliveryRating: number;
  deliveryTime: string;
  costForTwo: string;
  cuisine: string;
  features: {
    homeDelivery: boolean;
    takeaway: boolean;
    vegetarianOnly: boolean;
    indoorSeating: boolean;
    desserts: boolean;
  };
  images: string[];
  isVeg: boolean;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  isSpicy: boolean;
  isBestseller: boolean;
  category: string;
}

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Street Taco Express',
    description: 'Authentic Mexican street tacos made with traditional recipes and fresh ingredients.',
    address: 'Shop 6, Prestige Point, Opposite Vasant Market, College Road, Nashik',
    coordinates: { lat: 19.9975, lng: 73.7898 },
    hours: '11:00 AM - 10:00 PM',
    rating: 4.5,
    deliveryRating: 3.8,
    deliveryTime: '30-40',
    costForTwo: '₹200',
    cuisine: 'Mexican',
    features: {
      homeDelivery: true,
      takeaway: true,
      vegetarianOnly: true,
      indoorSeating: true,
      desserts: true
    },
    images: [
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800'
    ],
    isVeg: false,
    menu: [
      { 
        id: '1', 
        name: 'Carne Asada Taco', 
        price: 150, 
        description: 'Grilled steak with onions and cilantro',
        isVeg: false,
        isSpicy: true,
        isBestseller: true,
        category: 'Tacos'
      },
      { 
        id: '2', 
        name: 'Veg Supreme Taco', 
        price: 120, 
        description: 'Mixed vegetables with special sauce',
        isVeg: true,
        isSpicy: false,
        isBestseller: true,
        category: 'Tacos'
      },
      { 
        id: '3', 
        name: 'Chicken Burrito', 
        price: 180, 
        description: 'Grilled chicken with rice and beans',
        isVeg: false,
        isSpicy: true,
        isBestseller: false,
        category: 'Burritos'
      }
    ]
  }
]; 