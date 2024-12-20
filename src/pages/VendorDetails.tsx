import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

const mockVendor = {
  id: '1',
  name: 'Street Taco Express',
  description: 'Authentic Mexican street tacos made with traditional recipes and fresh ingredients.',
  address: '123 Food Street, Foodie City',
  hours: '11:00 AM - 10:00 PM',
  rating: 4.5,
  images: [
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800'
  ],
  menu: [
    { id: '1', name: 'Carne Asada Taco', price: 3.50, description: 'Grilled steak with onions and cilantro' },
    { id: '2', name: 'Al Pastor Taco', price: 3.00, description: 'Marinated pork with pineapple' },
    { id: '3', name: 'Chicken Taco', price: 3.00, description: 'Grilled chicken with fresh vegetables' }
  ],
  reviews: [
    {
      id: '1',
      userId: '1',
      userName: 'John D.',
      rating: 5,
      comment: 'Best tacos in the city! Authentic flavors and great service.',
      date: '2024-02-15'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah M.',
      rating: 4,
      comment: 'Really enjoyed the al pastor tacos. Will definitely come back!',
      date: '2024-02-10'
    }
  ]
};

export const VendorDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={mockVendor.images[0]}
            alt={mockVendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-4xl font-bold text-white">{mockVendor.name}</h1>
            <div className="flex items-center gap-2 text-white mt-2">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span>{mockVendor.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-4">{mockVendor.description}</p>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span>{mockVendor.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{mockVendor.hours}</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Menu Highlights</h2>
              <div className="space-y-4">
                {mockVendor.menu.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {mockVendor.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.userName}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};