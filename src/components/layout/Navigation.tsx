import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, FlagTriangleLeft, Video, Package, List, LucideMessageCircleDashed } from 'lucide-react';
import { SocialLogin } from '../auth/SocialLogin';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Video, label: 'Videos', path: '/videos' },
    { icon: LucideMessageCircleDashed, label: 'Feed', path: '/feed' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 ${
              location.pathname === path ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};