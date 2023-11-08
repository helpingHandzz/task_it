import React from 'react'
import { Link } from 'react-router-dom';

export default function Account() {
  return (
    <div className="AccountContainer m-4 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">My Tasks</h1>
        <Link to="/profile">
          <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">Profile Information</h1>
        </Link>

        <Link to="/skills">
          <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">My Skills</h1>
        </Link>
        <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">Reviews</h1>
        <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">Earnings</h1>
        <h1 className="border-4 rounded-lg p-4 text-3xl font-bold flex items-center justify-center hover:bg-cyan-600 cursor-pointer">Schedule</h1>
    </div>
  );
}
