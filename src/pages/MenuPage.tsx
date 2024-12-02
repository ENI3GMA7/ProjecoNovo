import React, { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useNotificationStore } from '../store/notificationStore';
import OrderModal from '../components/OrderModal';
import { MenuItem } from '../types';

type Category = 'matabicho' | 'almoco' | 'lanche' | 'jantar';

const categories: { id: Category; label: string }[] = [
  { id: 'matabicho', label: 'Mata-Bicho' },
  { id: 'almoco', label: 'Almoço' },
  { id: 'lanche', label: 'Lanche' },
  { id: 'jantar', label: 'Jantar' },
];

export default function MenuPage() {
  const { menuItems } = useMenuStore();
  const addNotification = useNotificationStore((state) => state.addNotification);
  const [selectedCategory, setSelectedCategory] = useState<Category>('matabicho');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const handleOrder = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleOrderSubmit = (quantity: number, observations: string) => {
    addNotification({
      type: 'order',
      message: `Novo pedido: ${quantity}x ${selectedItem?.name}`,
      data: { item: selectedItem, quantity, observations }
    });
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Nosso Cardápio</h1>
        
        {/* Categorias */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
                onClick={() => setSelectedCategory(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Pratos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold text-xl">
                    {item.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'MZN'
                    })}
                  </span>
                  <button 
                    onClick={() => handleOrder(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <OrderModal
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
}