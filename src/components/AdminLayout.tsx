import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, FileText, MessageSquare, LogOut, LucideIcon, BookUser } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { handleLogout } from '../hooks/useAuth';


const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems:{path:string,label:string,icon:LucideIcon}[] = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Produkty', icon: Package },
    { path: '/admin/orders', label: 'Zamówienia', icon: ShoppingCart },
    { path: '/admin/blog', label: 'Blog', icon: FileText },
    { path: '/admin/reviews', label: 'Recenzje', icon: MessageSquare },
    { path: '/admin/users',label:"Użytkownikami",icon:BookUser}
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-montserrat">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-700 px-4"> {/* Added padding */}
          <Link to="/admin" className="flex items-center justify-center"> {/* Ensure link takes full width */}
            <img src="/logoblanco.png" alt="Psielon Admin Logo" className="h-8 w-auto" /> {/* Replaced text with image */}
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2.5 rounded-md transition duration-200 ${
                location.pathname === item.path
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}

        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2.5 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200 w-full" // Added w-full
          >
            <LogOut className="h-5 w-5 mr-3" />
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar (Optional) */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Panel Administracyjny</h1>
          {/* Add user info or other top bar elements here */}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
