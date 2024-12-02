import React from 'react';
import { Award, Users, Coffee, Utensils } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Sobre o VUCHADA</span>
            <span className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50 blur-sm animate-pulse rounded-lg"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça nossa história e o que nos torna únicos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
              alt="VUCHADA Restaurant"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
            <p className="text-gray-600 mb-6">
              Fundado em 2020, o VUCHADA nasceu do sonho de trazer para Gurué uma experiência
              gastronômica única, combinando sabores tradicionais com apresentações modernas.
            </p>
            <p className="text-gray-600">
              Nossa missão é proporcionar momentos inesquecíveis através da boa comida,
              ambiente acolhedor e atendimento excepcional.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <Coffee className="h-8 w-8 text-orange-600" />,
              title: "Qualidade",
              description: "Ingredientes frescos e selecionados"
            },
            {
              icon: <Users className="h-8 w-8 text-orange-600" />,
              title: "Equipe",
              description: "Profissionais apaixonados pela gastronomia"
            },
            {
              icon: <Utensils className="h-8 w-8 text-orange-600" />,
              title: "Cardápio",
              description: "Pratos exclusivos e saborosos"
            },
            {
              icon: <Award className="h-8 w-8 text-orange-600" />,
              title: "Reconhecimento",
              description: "Premiado como melhor restaurante de Gurué"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow relative group"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-0 group-hover:opacity-50 blur-sm transition-opacity rounded-lg -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}