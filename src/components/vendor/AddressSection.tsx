import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressSectionProps {
  address: string;
  coordinates?: { lat: number; lng: number };
}

export const AddressSection: React.FC<AddressSectionProps> = ({ address, coordinates }) => {
  const mapUrl = coordinates 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.01}%2C${coordinates.lat-0.01}%2C${coordinates.lng+0.01}%2C${coordinates.lat+0.01}&amp;layer=mapnik&amp;marker=${coordinates.lat}%2C${coordinates.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=72.8%2C19.0%2C72.9%2C19.1&amp;layer=mapnik`;

  return (
    <div className="bg-white shadow-sm mt-3">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <h2 className="text-xl font-Proxima font-semibold mb-4">Address</h2>
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
          <p className="text-gray-700">{address}</p>
        </div>
        <div className="h-48 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapUrl}
            style={{ border: 0 }}
            title="Restaurant Location"
          />
        </div>
      </div>
    </div>
  );
};