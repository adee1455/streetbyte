import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { VendorDetails } from './pages/VendorDetails';
import Feed from './pages/Feed';
import Videos from './pages/Videos';
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
      </Routes>
      </div>
    </Router>
  );
}