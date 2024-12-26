import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CategoryScroll } from '../../components/home/CategoryScroll';
import VendorCard from '../../components/home/VendorCard';
import { Navigation } from '../../components/layout/Navigation';
import { LocationHeader } from '../../components/home/LocationHeader';
import { FloatingActionButton } from '../../components/home/FloatingActionButton';
import { useEffect,useState } from 'react';

interface Card {
  id: string;
  name: string;
  description: string;
  address: string;
  contact_number: string;
  rating: string; // Keep as string since the API returns it as a string
  foodType: string;
  images: string[];
  menu: string[];
}


export const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/cards`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Response was not JSON:", text);
          throw new TypeError("Oops, we haven't got JSON!");
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCards();
  }, []);

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
          {loading ? (
            <div>Loading...</div>
          ) : (
            cards.map((card, index) => (
              <VendorCard key={index} 
              vendor={card}
              />
            ))
          )}
        </div>
      </div>
      <FloatingActionButton />
      <Navigation />
    </div>
  );
};