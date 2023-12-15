
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen top-0 left-0 overflow-y-auto">
      <ul className="p-2">
        <li className="mb-2">
          <Link to="/" className="block p-2 hover:bg-gray-700">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/categories" className="block p-2 hover:bg-gray-700">
            Socratease Quizzes
          </Link>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
