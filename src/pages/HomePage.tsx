import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Phone, ChefHat, Gift, Snowflake, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReservationForm from '../components/ReservationForm';
import { useMenuStore } from '../store/menuStore';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() {
  const { specialItems } = useMenuStore();
  const featuredSpecial = specialItems[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Christmas Theme */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1482275548304-a58859dc31b7"
            alt="Restaurant Christmas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Animated Christmas Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Snowflake
                key={i}
                className="absolute text-white opacity-50 animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <div className="mb-8 flex justify-center">
              <Gift className="h-16 w-16 text-red-500 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-75 blur-lg rounded-lg animate-pulse"></span>
                <span className="relative">Celebre o Natal no</span>
              </span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="absolute -inset-2 bg-gradient-to-r from-green-500 via-red-500 to-green-500 opacity-75 blur-lg rounded-lg animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text animate-text-shine">
                  VUCHADA
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Momentos mágicos e sabores inesquecíveis neste Natal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors relative group"
              >
                <span className="relative z-10">Menu Natalino</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50 blur-sm group-hover:animate-pulse rounded-lg"></span>
              </Link>
              <Link
                to="/reservations"
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors relative group"
              >
                <span className="relative z-10">Reservar Mesa</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-green-500 via-red-500 to-green-500 opacity-50 blur-sm group-hover:animate-pulse rounded-lg"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Christmas Menu Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Especiais de Natal</h2>
            <p className="text-gray-600">Descubra nossa seleção especial para esta época mágica</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ceia Tradicional",
                description: "Peru assado, farofa especial, arroz natalino e muito mais",
                price: "2500",
                image: "https://images.unsplash.com/photo-1545042746-ec9e5a59b359"
              },
              {
                title: "Sobremesas Festivas",
                description: "Rabanada, pudim natalino e frutas cristalizadas",
                price: "800",
                image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9"
              },
              {
                title: "Bebidas Especiais",
                description: "Vinhos selecionados e cocktails natalinos",
                price: "1200",
                image: "https://images.unsplash.com/photo-1543363136-3fdb62e11be5"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-green-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-red-600 font-bold">
                    {parseInt(item.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'MZN'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Christmas Events Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eventos de Natal</h2>
            <p className="text-gray-600">Celebre conosco momentos especiais</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>
              <h3 className="text-2xl font-bold mb-4">Ceia de Natal</h3>
              <p className="text-gray-600 mb-4">
                24 de Dezembro • 20:00 - 23:00
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Menu especial de Natal
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Música ao vivo
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Decoração temática
                </li>
              </ul>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                Reservar
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-red-500 to-green-500"></div>
              <h3 className="text-2xl font-bold mb-4">Almoço de Natal</h3>
              <p className="text-gray-600 mb-4">
                25 de Dezembro • 12:00 - 16:00
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Buffet completo
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Sobremesas especiais
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Presentes para crianças
                </li>
              </ul>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Reservar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}