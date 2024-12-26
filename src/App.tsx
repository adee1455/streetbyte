import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './app/pages/Landing';
import { Header } from './components/Header';
import { Login } from './app/pages/Login';
import { Home } from './app/pages/Home';
import { Profile } from './app/pages/Profile';
import VendorDetails from './app/pages/VendorDetails';
import Feed from './app/pages/Feed';
import Videos from './app/pages/Videos';
import { VendorForm } from './components/vendor/VendorForm';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/form" element={<VendorForm />} />
      </Routes>
      </div>
    </Router>
  );
}