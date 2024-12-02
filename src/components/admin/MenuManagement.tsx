import React, { useState, useRef } from 'react';
import { Plus, Trash, Edit, Upload, Link as LinkIcon } from 'lucide-react';
import { MenuItem } from '../../types';
import { useMenuStore } from '../../store/menuStore';

const initialFormState: Partial<MenuItem> = {
  name: '',
  description: '',
  price: 0,
  category: 'matabicho',
  image: '',
};

export default function MenuManagement() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuStore();
  const [showForm, setShowForm] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<'file' | 'url'>('file');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.description && newItem.price && newItem.image) {
      if (editingId) {
        updateMenuItem({ ...newItem, id: editingId } as MenuItem);
      } else {
        const newMenuItem = {
          ...newItem,
          id: Date.now().toString(),
        } as MenuItem;
        addMenuItem(newMenuItem);
      }
      setNewItem(initialFormState);
      setShowForm(false);
      setEditingId(null);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setNewItem(item);
    setEditingId(item.id);
    setShowForm(true);
    setImageUploadType('url');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      deleteMenuItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowForm(true);
            setNewItem(initialFormState);
            setEditingId(null);
          }}
          className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Prato
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">
            {editingId ? 'Editar Prato' : 'Novo Prato'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Prato
                </label>
                <input
                  type="text"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem['category'] })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                >
                  <option value="matabicho">Mata-Bicho</option>
                  <option value="almoco">Almoço</option>
                  <option value="lanche">Lanche</option>
                  <option value="jantar">Jantar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={newItem.description || ''}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (MZN)
              </label>
              <input
                type="number"
                value={newItem.price || ''}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                min="0"
                step="1"
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
                  required={!newItem.image}
                />
              ) : (
                <input
                  type="url"
                  value={newItem.image || ''}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required={!newItem.image}
                />
              )}
            </div>

            {newItem.image && (
              <div className="mt-4">
                <img
                  src={newItem.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewItem(initialFormState);
                  setEditingId(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
              >
                {editingId ? 'Salvar Alterações' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-600 font-bold">
                  {item.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'MZN'
                  })}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}