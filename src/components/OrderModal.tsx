import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: MenuItem;
  onSubmit: (quantity: number, observations: string) => void;
}

export default function OrderModal({ isOpen, onClose, item, onSubmit }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(quantity, observations);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md relative my-8">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pr-8">Fazer Pedido</h2>
            
            <div className="mb-4 sm:mb-6">
              <div className="relative h-40 sm:h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.description}</p>
              <p className="text-orange-600 font-bold mt-2 text-lg sm:text-xl">
                {item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'MZN'
                })}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isSubmitting}
                    className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={isSubmitting}
                    className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 disabled:opacity-50 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm sm:text-base"
                  rows={3}
                  placeholder="Ex: Sem cebola, bem passado, etc."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex justify-between items-center font-bold py-4 border-t border-gray-200">
                <span className="text-base sm:text-lg">Total:</span>
                <span className="text-lg sm:text-xl text-orange-600">
                  {(item.price * quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'MZN'
                  })}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    <span>Processando...</span>
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}