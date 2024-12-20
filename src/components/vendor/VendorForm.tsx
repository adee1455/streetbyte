import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Clock, Info } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { mockVendors } from '../../data/mockVendors';

interface FormData {
  name: string;
  description: string;
  address: string;
  directions: string;
  hours: string;
  images: FileList | null;
  features: {
    homeDelivery: boolean;
    takeaway: boolean;
    vegetarianOnly: boolean;
    indoorSeating: boolean;
    desserts: boolean;
  };
  costForTwo: string;
}

export const VendorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    address: '',
    directions: '',
    hours: '',
    images: null,
    features: {
      homeDelivery: false,
      takeaway: false,
      vegetarianOnly: false,
      indoorSeating: false,
      desserts: false,
    },
    costForTwo: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.hours) newErrors.hours = 'Operating hours are required';
    if (!formData.costForTwo) newErrors.costForTwo = 'Cost for two is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Get existing vendors or initialize empty array
    const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    
    // Create new vendor object
    const newVendor = {
      id: Date.now().toString(),
      ...formData,
      images: formData.images ? Array.from(formData.images).map(file => URL.createObjectURL(file)) : [],
      rating: 0,
      reviews: [],
      menu: [],
      coordinates: { lat: 19.9975, lng: 73.7898 },
      deliveryRating: 0,
      deliveryTime: '30-40 min',
      cuisine: 'Street Food',
      isVeg: false,
      pno: 8767564998
    };

    // Save to localStorage
    localStorage.setItem('vendors', JSON.stringify([...existingVendors, newVendor]));

    mockVendors.push(newVendor);
    
    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Food Outlet</h1>
        
        <div className="space-y-4">
          <Input
            label="Outlet Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="images"
                onChange={(e) => setFormData({ ...formData, images: e.target.files })}
              />
              <label htmlFor="images" className="cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-500">Upload images</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Location"
              icon={<MapPin className="w-5 h-5" />}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
              required
            />

            <Input
              label="Operating Hours"
              icon={<Clock className="w-5 h-5" />}
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              placeholder="e.g., 11:00 AM - 10:00 PM"
              error={errors.hours}
              required
            />

            <Input
              label="Cost for Two"
              icon={<Info className="w-5 h-5" />}
              value={formData.costForTwo}
              onChange={(e) => setFormData({ ...formData, costForTwo: e.target.value })}
              placeholder="e.g., ₹200"
              error={errors.costForTwo}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.features).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: {
                          ...formData.features,
                          [key]: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Describe your outlet..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/home')}
        >
          Cancel
        </Button>
        <Button type="submit">
          Add Outlet
        </Button>
      </div>
    </form>
  );
};