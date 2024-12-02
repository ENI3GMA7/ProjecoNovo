import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  UtensilsCrossed, 
  Star, 
  User,
  Users,
  ShoppingBag,
  LogOut,
  X 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function AdminSidebar({ 
  isOpen, 
  onClose, 
  currentView, 
  onViewChange 
}: AdminSidebarProps) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'menu', icon: MenuIcon, label: 'Cardápio' },
    { id: 'specials', icon: Star, label: 'Especiais' },
    { id: 'orders', icon: ShoppingBag, label: 'Pedidos' },
    { id: 'customers', icon: Users, label: 'Clientes' },
    { id: 'profile', icon: User, label: 'Meu Perfil' },
  ];

  return (
    <div className={`
      fixed md:relative inset-y-0 left-0 z-30
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 transition-transform duration-300 ease-in-out
    `}>
      <div className="flex flex-col h-full w-64 bg-white border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-orange-600" />
            <span className="ml-2 text-xl font-bold">Admin Panel</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`
                w-full flex items-center px-4 py-2 rounded-md
                ${currentView === id 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}