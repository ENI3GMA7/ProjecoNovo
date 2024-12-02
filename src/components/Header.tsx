import React from 'react';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-orange-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Utensils className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">Restaurante Sabor & Arte</h1>
        </div>
        <p className="text-center mt-2 text-orange-100">
          Reserve sua mesa e prepare-se para uma experiência gastronômica única
        </p>
      </div>
    </header>
  );
}