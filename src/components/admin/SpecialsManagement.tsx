import React, { useState, useRef } from 'react';
import { Plus, Star, Trash, Upload, Link as LinkIcon } from 'lucide-react';
import { MenuItem } from '../../types';
import { useMenuStore } from '../../store/menuStore';

export default function SpecialsManagement() {
  const { menuItems, specialItems, addSpecialItem, removeSpecialItem } = useMenuStore();
  const [showSelector, setShowSelector] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<'file' | 'url'>('file');
  const [newSpecial, setNewSpecial] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'almoco',
    image: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSpecial({ ...newSpecial, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpecial = (item: MenuItem) => {
    addSpecialItem(item);
    setShowSelector(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSpecial.name && newSpecial.description && newSpecial.price && newSpecial.image) {
      const customSpecial = {
        ...newSpecial,
        id: Date.now().toString(),
      } as MenuItem;
      addSpecialItem(customSpecial);
      setShowCustomForm(false);
      setNewSpecial({
        name: '',
        description: '',
        price: 0,
        category: 'almoco',
        image: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Pratos Especiais do Dia</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowSelector(true);
                setShowCustomForm(false);
              }}
              className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Do Cardápio
            </button>
            <button
              onClick={() => {
                setShowCustomForm(true);
                setShowSelector(false);
              }}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Novo Especial
            </button>
          </div>
        </div>

        {showSelector && (
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Selecione um prato para adicionar aos especiais:</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems
                .filter((item) => !specialItems.some((special) => special.id === item.id))
                .map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 cursor-pointer hover:border-orange-500"
                    onClick={() => handleAddSpecial(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h5 className="font-medium">{item.name}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {showCustomForm && (
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-4">Criar Novo Especial</h4>
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Prato
                </label>
                <input
                  type="text"
                  value={newSpecial.name}
                  onChange={(e) => setNewSpecial({ ...newSpecial, name: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newSpecial.description}
                  onChange={(e) => setNewSpecial({ ...newSpecial, description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (MZN)
                </label>
                <input
                  type="number"
                  value={newSpecial.price}
                  onChange={(e) => setNewSpecial({ ...newSpecial, price: Number(e.target.value) })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setImageUploadType('file')}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      imageUploadType === 'file'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Arquivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType('url')}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      imageUploadType === 'url'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <LinkIcon className="h-5 w-5 mr-2" />
                    URL da Imagem
                  </button>
                </div>

                {imageUploadType === 'file' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="w-full"
                    required={!newSpecial.image}
                  />
                ) : (
                  <input
                    type="url"
                    value={newSpecial.image}
                    onChange={(e) => setNewSpecial({ ...newSpecial, image: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="https://exemplo.com/imagem.jpg"
                    required={!newSpecial.image}
                  />
                )}
              </div>

              {newSpecial.image && (
                <div className="mt-4">
                  <img
                    src={newSpecial.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
                >
                  Adicionar Especial
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">
                    {item.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'MZN'
                    })}
                  </span>
                  <button
                    onClick={() => removeSpecialItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}