import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, LogOut, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLocationStore } from '../store/locationStore';

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { city } = useLocationStore();

  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-[26px] font-semibold font-Proxima text-[#EF4443]">StreetByte</span>
          </Link>

          <div className="flex items-center gap-4">

            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <User className="w-6 h-6 text-gray-600 hover:text-red-500" />
                </Link>
                <button onClick={logout}>
                  <LogOut className="w-6 h-6 text-gray-600 hover:text-red-500" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-red-500 text-lg hover:text-red-600">
                Login
              </Link>
            )}
            <Menu className="w-6 h-6 text-gray-600 hover:text-red-500 md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};