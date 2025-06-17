import { Compass } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VoiceFind
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Favorites
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Help
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
