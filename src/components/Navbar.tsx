import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Home, Menu, Calendar, Info, Phone } from 'lucide-react';
import SignUpModal from './SignUpModal';

export default function Navbar() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <nav className="bg-orange-600 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <Utensils className="h-8 w-8 mr-2 animate-bounce" />
              <span className="text-2xl font-bold relative">
                <span className="relative">
                  <span className="absolute -inset-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-75 blur-lg rounded-lg animate-pulse"></span>
                  <span className="relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text animate-text-shine">
                    VUCHADA
                  </span>
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center hover:text-orange-200 transition-colors">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link to="/menu" className="flex items-center hover:text-orange-200 transition-colors">
                <Menu className="h-5 w-5 mr-1" />
                <span>Cardápio</span>
              </Link>
              <Link to="/reservations" className="flex items-center hover:text-orange-200 transition-colors">
                <Calendar className="h-5 w-5 mr-1" />
                <span>Reservas</span>
              </Link>
              <Link to="/about" className="flex items-center hover:text-orange-200 transition-colors">
                <Info className="h-5 w-5 mr-1" />
                <span>Sobre</span>
              </Link>
              <Link to="/contact" className="flex items-center hover:text-orange-200 transition-colors">
                <Phone className="h-5 w-5 mr-1" />
                <span>Contato</span>
              </Link>
              <button
                onClick={() => setIsSignUpOpen(true)}
                className="bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-orange-100 transition-colors relative group"
              >
                <span>Cadastrar</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50 blur-sm group-hover:animate-pulse rounded-lg -z-10"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </>
  );
}