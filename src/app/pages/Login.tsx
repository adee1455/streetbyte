import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SocialLogin } from '../../components/auth/SocialLogin';
import { EmailLogin } from '../../components/auth/EmailLogin';
import { Divider } from '../../components/ui/Divider';

export const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLoginSuccess = (userData: any) => {
    login(userData);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to StreetBite
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SocialLogin onSuccess={handleLoginSuccess} />
          <Divider text="Or continue with" />
          <EmailLogin onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  );
};