import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import CommentSection from '../components/CommentSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Entre em Contato</span>
            <span className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50 blur-sm animate-pulse rounded-lg"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para atender você
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-xl p-8 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500 animate-pulse"></div>
            <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-gray-600">Rua Principal, 123, Gurué, Zambézia</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-gray-600">+258 84 123 4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">vuchada@email.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold">Horário de Funcionamento</h3>
                  <p className="text-gray-600">Segunda à Domingo: 07:00 - 23:00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
}