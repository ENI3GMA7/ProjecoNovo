import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminProfile from '../../components/admin/AdminProfile';
import MenuManagement from '../../components/admin/MenuManagement';
import SpecialsManagement from '../../components/admin/SpecialsManagement';
import OrderManagement from '../../components/admin/OrderManagement';
import CustomerManagement from '../../components/admin/CustomerManagement';
import NotificationCenter from '../../components/admin/NotificationCenter';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('menu');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {currentView === 'menu' && 'Gestão do Cardápio'}
              {currentView === 'specials' && 'Pratos Especiais'}
              {currentView === 'orders' && 'Gestão de Pedidos'}
              {currentView === 'customers' && 'Clientes'}
              {currentView === 'profile' && 'Meu Perfil'}
            </h1>
            <NotificationCenter />
          </div>
        </header>

        <main className="p-6">
          {currentView === 'menu' && <MenuManagement />}
          {currentView === 'specials' && <SpecialsManagement />}
          {currentView === 'orders' && <OrderManagement />}
          {currentView === 'customers' && <CustomerManagement />}
          {currentView === 'profile' && <AdminProfile />}
        </main>
      </div>
    </div>
  );
}