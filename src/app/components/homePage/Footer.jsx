import { Compass } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Compass className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">VoiceFind</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powered by advanced AI technology to help you discover amazing
            places through voice commands and intelligent search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Voice Search</li>
              <li>AI-Powered Results</li>
              <li>Location Discovery</li>
              <li>Smart Recommendations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 mb-4">Stay updated with new features</p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Follow Updates
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 VoiceFind. All rights reserved. Built with advanced AI
            technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
