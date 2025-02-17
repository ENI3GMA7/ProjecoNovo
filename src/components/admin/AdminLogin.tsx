import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Loader, Lock, User, Coffee } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'username' | 'password' | null>(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (login(credentials.username, credentials.password)) {
        navigate('/admin/dashboard');
      } else {
        alert('Credenciais inválidas');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>
        <div className="absolute top-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-50"></div>

        <div className="text-center relative">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Coffee className="h-12 w-12 text-orange-600 animate-pulse" />
              <div className="absolute -inset-2 bg-orange-100 rounded-full blur-lg -z-10"></div>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 relative inline-block">
            Área Administrativa
            <div className="absolute -inset-1 bg-orange-100 rounded-lg blur-lg -z-10"></div>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Acesse o painel de controle do VUCHADA</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className={`relative transform transition-all duration-200 ${
              focusedInput === 'username' ? 'scale-[1.02]' : ''
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 transition-colors duration-200 ${
                  focusedInput === 'username' ? 'text-orange-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="username"
                type="text"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg outline-none transition-all duration-200 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:shadow-lg"
                placeholder="Usuário"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
                disabled={isLoading}
                aria-label="Usuário"
              />
              <div className={`absolute inset-0 rounded-lg bg-orange-50 opacity-0 transition-opacity duration-200 -z-10 ${
                focusedInput === 'username' ? 'opacity-100' : ''
              }`}></div>
            </div>

            <div className={`relative transform transition-all duration-200 ${
              focusedInput === 'password' ? 'scale-[1.02]' : ''
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors duration-200 ${
                  focusedInput === 'password' ? 'text-orange-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg outline-none transition-all duration-200 hover:border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:shadow-lg"
                placeholder="Senha"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                disabled={isLoading}
                aria-label="Senha"
              />
              <div className={`absolute inset-0 rounded-lg bg-orange-50 opacity-0 transition-opacity duration-200 -z-10 ${
                focusedInput === 'password' ? 'opacity-100' : ''
              }`}></div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {isLoading ? (
                  <Loader className="h-5 w-5 text-orange-300 animate-spin" />
                ) : (
                  <Lock className="h-5 w-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
                )}
              </span>
              {isLoading ? 'Entrando...' : 'Entrar'}
              <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
          </div>
        </form>

        {/* Decorative Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>
      </div>
    </div>
  );
}