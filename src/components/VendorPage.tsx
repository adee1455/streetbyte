
import React, { useState } from 'react';
import { Star, Phone, Navigation2, PenSquareIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddressSection } from '../components/vendor/AddressSection';
import { ImageGallery } from '../components/vendor/ImageGallery';
import { Modal } from '../components/ui/Modal';
import { Review } from '../types';
import { MenuItem } from '../types';

interface VendorPageProps {
  name: string;
  description: string;
  address: string;
  contact_number: string;
  rating: string;
  foodType: string;
  images: { image_url: string }[];
  menu: MenuItem[];
  reviews: Review[];
}


const VendorPage: React.FC<VendorPageProps> = ({
  name,
  description,
  address,
  contact_number,
  rating,
  foodType,
  images,
  menu,
  reviews,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (images: string) => {
    setSelectedImage(images);
    setIsModalOpen(true);
  };
console.log(images);
  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery Section */}

      <ImageGallery images={images} />
      {/* <img
            src={images[0]}
            alt={name}
           className="w-full h-48 object-cover"
        /> */}

      {/* Vendor Details */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-2">
          <div className="pb-4 border-b">
            <h1 className="text-[26px] font-bold font-Proxima text-black">{name}</h1>
            <p className="text-gray-600 text-sm font-Proxima">{foodType}</p>
            <p className="text-gray-600 font-Proxima text-sm">{address}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-5xl mx-auto pt-4 pb-2">
        <div className="px-4">
          <h2 className="font-semibold mb-3 text-lg">Description</h2>
          <p className="px-4 text-sm text-gray-700 text-justify">{description}</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white mt-2">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h2 className="font-semibold mb-3 text-lg">More Info</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {/* Static features for now */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <Star className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm">Home Delivery</span>
            </div>
          </div>
        </div>
      </div>

     {/* Menu Section */}
<div className="p-2 px-4">
  <h2 className="text-xl font-Proxima font-semibold">Menu</h2>
  <div className="pt-3 pb-2 bg-white flex">
    {Array.isArray(menu) && menu.length > 0 ? (
      menu.map((item, index) => (
        <img
          key={index}  // You can use index here if the `item.id` is not guaranteed to be unique across all menu items
          src={item?.image_url}  // Accessing the image_url property
          className="h-32 cursor-pointer pl-4"
          alt={`Menu item ${index + 1}`}  // Updated alt text to reflect index
          onClick={() => openModal(item?.image_url)}  // Open the modal with the clicked item's image
        />
      ))
    ) : (
      <p>No menu items available.</p>
    )}
  </div>
</div>


      {/* Image Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-center items-center h-full">
          <img
            src={selectedImage}
            alt="Menu"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      </Modal>

      {/* Address Section */}
      <div className="pb-10">
        <AddressSection address={address} />
      </div>

     {/* Action Buttons */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t">
  <div className="grid grid-cols-2 gap-4 p-4">
    {/* Direction Button */}
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={() => window.open(`https://maps.google.com/?q=${address}`)} // URL-encoded address
    >
      <Navigation2 className="w-4 h-4" /> {/* Icon for directions */}
      Direction
    </Button>

    {/* Call Button */}
    <Button
      className="flex items-center justify-center gap-2"
      onClick={() => window.open(`tel:+91${contact_number}`)} // Phone number with country code
    >
      <Phone className="w-4 h-4" /> {/* Icon for calling */}
      Call
    </Button>
  </div>
</div>



      {/* Reviews Section */}
      <div className="mt-2 px-4 py-4 pb-24">
        <div className="flex gap-2 justify-between">
          <h2 className="text-xl font-Proxima font-semibold mb-4">Reviews</h2>
          <div className="pt-1">
            <PenSquareIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.user_id}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.created_at}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
