import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Info, PhoneCallIcon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface FormData {
  name: string;
  foodType: string;
  address: string;
  images: FileList | null;
  menu: FileList | null;
  features: {
    homeDelivery: boolean;
    takeaway: boolean;
    vegetarianOnly: boolean;
    indoorSeating: boolean;
    desserts: boolean;
  };
  coordinates: { lat: number | null; lng: number | null };
  phoneNo: string;
  description: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export const VendorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    foodType: '',
    address: '',
    images: null,
    menu: null,
    features: {
      homeDelivery: false,
      takeaway: false,
      vegetarianOnly: false,
      indoorSeating: false,
      desserts: false,
    },
    coordinates: { lat: null, lng: null },
    phoneNo: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [locationError, setLocationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [menuPreviews, setMenuPreviews] = useState<string[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDnFERa1oyGkz3C8hWtPWi0UGtx1iD1FxM", // Replace with your API key
    libraries: ['places'], // Load the places library
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setLocationError(null);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          setLocationError("Location permission denied. Please enable location services.");
          setFormData((prevData) => ({
            ...prevData,
            coordinates: { lat: 28.6139, lng: 77.209 }, // Default to New Delhi
          }));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');

    const newVendor = {
      id: Date.now().toString(),
      ...formData,
      images: formData.images ? Array.from(formData.images).map(file => URL.createObjectURL(file)) : [],
      menu: formData.menu ? Array.from(formData.menu).map(file => URL.createObjectURL(file)) : [],
    };

    localStorage.setItem('vendors', JSON.stringify([...existingVendors, newVendor]));

    navigate('/home');
  };

  if (!isLoaded) return <div>Loading...</div>;

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

      <div>
      <h2 className='text-gray-700 py-3'>Select Food Outlet Location</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={formData.coordinates.lat ? formData.coordinates : { lat: 28.6139, lng: 77.209 }}
        onClick={(event) => {
          setFormData({
            ...formData,
            coordinates: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
          });
        }}
      >
        {formData.coordinates.lat && formData.coordinates.lng && (
          <Marker position={formData.coordinates} />
        )}
      </GoogleMap>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate('/home')}>
          Cancel
        </Button>
        <Button type="submit">Add Outlet</Button>
      </div>
    </form>
  );
};
