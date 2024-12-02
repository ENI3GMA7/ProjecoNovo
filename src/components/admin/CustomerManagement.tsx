import React, { useState } from 'react';
import { Search, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { useCustomerStore } from '../../store/customerStore';

export default function CustomerManagement() {
  const { customers } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Clientes Cadastrados</h2>
          
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{customer.name}</h3>
                  <p className="text-gray-500 text-sm">Cliente desde {new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2 text-orange-500" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2 text-orange-500" />
                  <span className="text-sm">{customer.phone}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                  <span className="text-sm">{customer.birthday}</span>
                </div>

                {customer.address && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Total de Pedidos:</span>
                  <span className="font-semibold">{customer.totalOrders}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Valor Total Gasto:</span>
                  <span className="font-semibold text-orange-600">
                    {customer.totalSpent.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'MZN'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}