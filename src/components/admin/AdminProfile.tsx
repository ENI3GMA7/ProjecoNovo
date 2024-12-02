import React, { useState } from 'react';
import { Camera, Mail, Phone, User, MapPin, Calendar, Shield, Award, Clock } from 'lucide-react';

interface AdminData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  location: string;
  joinDate: string;
  lastLogin: string;
  achievements: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: 'Administrador',
    email: 'admin@vuchada.com',
    phone: '+258 84 123 4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    role: 'Administrador Principal',
    location: 'Gurué, Zambézia',
    joinDate: '2023-01-01',
    lastLogin: new Date().toISOString(),
    achievements: [
      {
        title: 'Especialista em Gestão',
        description: '100 pedidos processados com sucesso',
        icon: <Award className="h-8 w-8 text-yellow-500" />
      },
      {
        title: 'Mestre do Cardápio',
        description: '50 pratos adicionados ao menu',
        icon: <Shield className="h-8 w-8 text-blue-500" />
      }
    ]
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminData({ ...adminData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative group">
              <img
                src={adminData.avatar}
                alt="Admin"
                className="w-32 h-32 rounded-full border-4 border-white object-cover transition-transform group-hover:scale-105"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-orange-600 rounded-full text-white cursor-pointer hover:bg-orange-700 transition-colors">
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-md text-white hover:bg-opacity-30 transition-colors"
          >
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">{adminData.name}</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 mr-3 text-orange-600" />
                  <span>{adminData.role}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3 text-orange-600" />
                  <span>{adminData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3 text-orange-600" />
                  <span>{adminData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-orange-600" />
                  <span>{adminData.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-orange-600" />
                <span>Membro desde: {new Date(adminData.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-orange-600" />
                <span>Último acesso: {new Date(adminData.lastLogin).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold mb-6">Conquistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminData.achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}