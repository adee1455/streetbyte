import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Info, PhoneCallIcon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { storage } from '../../lib/appwrite';
import { ID } from 'appwrite';

interface FormData {
  name: string;
  foodType: string;
  address: string;
  rating: string;
  images: FileList | null;
  menu: FileList | null;
  // features: {
  //   homeDelivery: boolean;
  //   takeaway: boolean;
  //   vegetarianOnly: boolean;
  //   indoorSeating: boolean;
  //   desserts: boolean;
  // };
  phoneNo: string;
  description: string;
}

export const VendorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    foodType: '',
    address: '',
    images: null,
    menu: null,
    rating: '',
    phoneNo: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [menuPreviews, setMenuPreviews] = useState<string[]>([]);

 

  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.foodType) newErrors.foodType = 'Food type is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required';
    if (!formData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');

    const newVendor = {
      id: Date.now().toString(),
      ...formData,
    };

    // Upload vendor images
    const vendorImageUrls = await uploadImages(formData.images);
    const menuImageUrls = await uploadImages(formData.menu);

    // Insert vendor into the database
    await insertVendor(newVendor, vendorImageUrls, menuImageUrls);

    localStorage.setItem('vendors', JSON.stringify([...existingVendors, newVendor]));

    navigate('/home');
  };

  const uploadImages = async (files: FileList | null): Promise<string[]> => {
    if (!files) return [];

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const response = await storage.createFile(
          '676ab6de002caef140d0',
          ID.unique(),
          file
        );
        const url = response.$id;
        urls.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle the error as needed (e.g., show a notification)
      }
    }
    return urls;
  };

  const insertVendor = async (vendor: any, vendorImageUrls: string[], menuImageUrls: string[]) => {
    // Insert vendor into the database
    await fetch('/api/vendors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendor),
    });

    // Insert vendor images
    for (const url of vendorImageUrls) {
      await fetch('/api/vendor-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor_id: vendor.id,
          image_url: url,
        }),
      });
    }

    // Insert menu images
    for (const url of menuImageUrls) {
      await fetch('/api/menu-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor_id: vendor.id,
          image_url: url,
        }),
      });
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold font-ProximaBold italic text-gray-900 mb-6">Add New Food Outlet</h1>

      <Input
        label="Outlet Name"
        placeholder='Outlet Name*'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Outlet Images (min 1)*</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="images"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setFormData((prevData) => ({
                  ...prevData,
                  images: files,
                }));
                const newImagePreviews = Array.from(files).map(file => URL.createObjectURL(file));
                setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
              }
            }}
          />
          <label htmlFor="images" className="cursor-pointer">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm text-gray-500">Upload images</span>
          </label>
        </div>
      </div>
      
      {imagePreviews.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700">Selected Images:</h3>
          <div className="flex space-x-2">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Food Type*
        </label>
        <select
          value={formData.foodType}
          onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          required
        >
          <option value="">Select Food Type</option>
          <option value="vegetarian">Street Food</option>
          <option value="non-vegetarian">Fast Food</option>
          <option value="vegan">Beverages</option>
          <option value="gluten-free">Desserts</option>
          <option value="gluten-free">Fine Dine</option>
        </select>
      </div>

      <Input
        label="Address"
        icon={<MapPin className="w-5 h-5" />}
        placeholder='Address*'
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        error={errors.address}
        required
      />

      <Input
        label="Phone Number"
        icon={<PhoneCallIcon className="w-4 h-4" />}
        placeholder='Phone No.'
        value={formData.phoneNo}
        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
        error={errors.phoneNo}
        required
      />

        <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">

             </label>
                <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 "
                placeholder="Describe the outlet..."
                required
              />
            </div>
            
      
      

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Menu</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="menu"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setFormData({ ...formData, menu: files });
                const newMenuPreviews = Array.from(files).map(file => URL.createObjectURL(file));
                setMenuPreviews((prevPreviews) => [...prevPreviews, ...newMenuPreviews]);
              }
            }}
          />
          <label htmlFor="menu" className="cursor-pointer">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm text-gray-500">Upload menu images</span>
          </label>
        </div>
      </div>

      {menuPreviews.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700">Selected Menu Images:</h3>
          <div className="flex space-x-2">
            {menuPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Menu Preview ${index}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate('/home')}>
          Cancel
        </Button>
        <Button type="submit">Add Outlet</Button>
      </div>
    </form>
  );
};
