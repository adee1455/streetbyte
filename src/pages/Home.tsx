import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { CategoryScroll } from '../components/home/CategoryScroll';
import { VendorCard } from '../components/home/VendorCard';
import { Navigation } from '../components/layout/Navigation';
import { LocationHeader } from '../components/home/LocationHeader';
import { FloatingActionButton } from '../components/home/FloatingActionButton';

const mockVendors = [
  {
    id: '1',
    name: 'Street Taco Express',
    description: 'Authentic Mexican street tacos',
    address: 'Food Street, Downtown',
    cuisineType: ['Mexican', 'Street Food'],
    rating: 4.5,
    pno: 8767564998,
    images: ['https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800'],
    menu: [],
    reviews: []
  },
  {
    id: '2',
    name: 'Dim Sum Paradise',
    description: 'Traditional Chinese street food',
    address: 'China Town, City Center',
    cuisineType: ['Chinese', 'Dim Sum'],
    rating: 4.8,
    pno: 9876543210,
    images: ['https://images.unsplash.com/photo-1455279032140-49a4bf46f343?auto=format&fit=crop&q=80&w=800'],
    menu: [],
    reviews: []
  }
];

export const Home = () => {
  return (
    <div className="pb-16 md:pb-0">
      {/* Header */}
      <div className="bg-white  top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <LocationHeader />
          
          <Input
            icon={<Search className="w-5 h-5" />}
            placeholder="Search for street food vendors..."
            className="mb-4 mt-4"
          />
          
          <CategoryScroll />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Popular Near You</h2>
          <Button variant="outline" size="sm">
            See All
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
      <FloatingActionButton />
      <Navigation />
    </div>
  );
};