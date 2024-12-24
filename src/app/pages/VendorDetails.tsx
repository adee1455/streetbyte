import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Navigation2, Camera, Heart, Share2, NotebookPen, PenSquareIcon, } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Navigation } from '../../components/layout/Navigation';
import { AddressSection } from '../../components/vendor/AddressSection';
import { ImageGallery } from '../../components/vendor/ImageGallery';
import { Modal } from '../../components/ui/Modal';

const mockVendor = {
  id: '1',
  name: 'Street Taco Express',
  foodType: 'Street Food',
  description: 'Authentic Mexican street tacos made with traditional recipes and fresh ingredients.',
  address: 'C6, Brijesh Society, Cidco, Nashik',
  pno: 8767564998,
  hours: '11:00 AM - 10:00 PM',
  rating: 4.5,
  deliveryRating: 3.8,
  costForTwo: '200',
  coordinates: { lat: 19.9975, lng: 73.7898 },
  features: {
    homeDelivery: true,
    takeaway: true,
    vegetarianOnly: true,
    indoorSeating: true,
    desserts: true,
  },
  images: [
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800'
  ],
  menu: [
    { id: '1', imageUrl: '/menu.avif' },
    { id: '2', imageUrl: '/menu2.avif' }
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
  const [activeTab, setActiveTab] = useState<'menu' | 'photos' | 'reviews'>('menu');
  const [showGallery, setShowGallery] = useState(false);
  const { id } = useParams<{ id: string }>();
  const vendor = mockVendor; // Assuming you fetch the vendor based on the ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      
       <ImageGallery images={mockVendor.images} />
     
      <div className="bg-white ">
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-2">
        <div className='pb-4 border-b '>
              <h1 className="text-[26px] font-bold font-Proxima text-black ">{mockVendor.name}</h1>
              <p className="text-gray-600 text-sm font-Proxima">Mexican, Street Food</p>
              <p className="text-gray-600 font-Proxima text-sm">{mockVendor.address}</p>
        </div>
          
        </div>
      </div>

      <div className='max-w-5xl mx-auto pt-4 pb-2'>
        <div className="px-4">
          <h2 className="font-semibold mb-3 text-lg ">Description</h2>
        </div>
        <div className='px-4 text-sm text-gray-700 text-justify'>
          <p>Best tacos in the city! Authentic flavors and great service. Really enjoyed the al pastor tacos. Will definitely come back! Authentic flavors and great service. Really enjoyed the al pastor tacos. WillAuthentic flavors and great service. Really enjoyed the al pastor tacos. Will</p>
        </div>
      </div>

      <div className="bg-white mt-2 ">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h2 className="font-semibold mb-3 text-lg">More Info</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {Object.entries(mockVendor.features).map(([key, value]) => (
              value && (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Star className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 px-4">
        <h2 className="text-xl font-Proxima font-semibold">Menu</h2>
        <div className='pt-3 pb-2 bg-white flex'>
          {mockVendor.menu.map((item) => (
            <img
              key={item.id}
              src={item.imageUrl}
              className='h-32 cursor-pointer pl-4'
              alt={`Menu item ${item.id}`}
              onClick={() => openModal(item.imageUrl)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-center items-center h-full">
          <img
            src={selectedImage}
            alt="Menu"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      </Modal>

      <div className='pb-10'>
        <AddressSection address={mockVendor.address}/>
      </div>


      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-2 gap-4 p-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => window.open(`https://maps.google.com/?q=${mockVendor.address}`)}
          >
            <Navigation2 className="w-4 h-4" />
            Direction
          </Button>
          <Button
            className="flex items-center justify-center gap-2"
            onClick={() => window.open(`tel:+91${mockVendor.pno}`)}
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
        </div>
      </div>
      <div className="mt-2 px-4 py-4 pb-24">
         <div className='flex gap-2 justify-between'>
            <h2 className="text-xl font-Proxima font-semibold mb-4">Reviews</h2>
            <div className='pt-1'>
              <PenSquareIcon className='w-5 h-5'/>
            </div>
          </div>
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
      {/* <Navigation/> */}
    </div>
  );
};