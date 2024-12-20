import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocationStore } from '../../store/locationStore';

export const LocationHeader = () => {
  const navigate = useNavigate();
  const { city, clearCity } = useLocationStore();

  const handleChangeLocation = () => {
    clearCity();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-red-500" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{city}</span>
        <button 
          onClick={handleChangeLocation}
          className="text-xs text-red-500 hover:text-red-600 text-left"
        >
          Change Location
        </button>
      </div>
    </div>
  );
};