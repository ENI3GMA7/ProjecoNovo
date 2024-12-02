import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReservationForm from '../components/ReservationForm';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Faça sua Reserva</span>
            <span className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50 blur-sm animate-pulse rounded-lg"></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reserve sua mesa e prepare-se para uma experiência gastronômica única
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500 animate-pulse"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Horário de Funcionamento</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <span>Segunda à Domingo</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  <span>07:00 - 23:00</span>
                </div>
              </div>
            </div>
            <div>
              <ReservationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}