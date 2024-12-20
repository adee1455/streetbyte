import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EmailLoginProps {
  onSuccess: (userData: any) => void;
}

export const EmailLogin: React.FC<EmailLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual email login logic here
    onSuccess({
      id: '3',
      name: 'Email User',
      email: email,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
};