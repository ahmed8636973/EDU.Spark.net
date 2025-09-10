import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ userRole }) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-xl">EDUSpark</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {userRole === 'admin' && <Link to="/admin">Dashboard</Link>}
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}