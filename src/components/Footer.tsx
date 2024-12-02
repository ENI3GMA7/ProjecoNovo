import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Utensils } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="h-8 w-8 mr-2 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-green-500 to-red-500 text-transparent bg-clip-text animate-pulse">
                VUCHADA
              </span>
            </div>
            <p className="text-gray-400">
              Sabores únicos e momentos inesquecíveis no coração de Gurué.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2 text-orange-500" />
                +258 84 123 4567
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-orange-500" />
                vuchada@email.com
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                Rua Principal, 123, Gurué
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Reservas
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} VUCHADA. Todos os direitos reservados. Desenvolvido por{' '}
            <a 
              href="https://wa.me/258843390749" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Hélder Alves(37)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}