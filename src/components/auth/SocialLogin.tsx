import React from 'react';
import { Button } from '../ui/Button';

interface SocialLoginProps {
  onSuccess: (userData: any) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ onSuccess }) => {
  const handleGoogleLogin = () => {
    // Implement actual Google login logic here
    onSuccess({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    });
  };

  const handleFacebookLogin = () => {
    // Implement actual Facebook login logic here
    onSuccess({
      id: '2',
      name: 'Test User',
      email: 'test@example.com',
    });
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </Button>

      <Button
        onClick={handleFacebookLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <img
          src="https://www.facebook.com/favicon.ico"
          alt="Facebook"
          className="w-5 h-5"
        />
        Continue with Facebook
      </Button>
    </div>
  );
};