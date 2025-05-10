import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, User, Shield, ShoppingBag } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { User_Profile } from '../../types';
import UserManagement from './UserManagment';


const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User_Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Obtener rol del usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data} = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();
          setCurrentUserRole(data?.role || null);
        }

        const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        user_id,
        first_name,
        last_name,
        phone,
        role
      `);

        // Obtener todos los usuarios
        
          /* .order('created_at', { ascending: false }); */

        if (error) throw error;
        setUsers([]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newUserEmail) return;
    
    setLoading(true);
    try {
      // 1. Crear usuario en Auth
      const { data, error: authError } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: 'tempPassword123', // El usuario deberá cambiarla
        email_confirm: true,
      });

      if (authError) throw authError;

      // 2. Asignar rol en tabla users
      const { error: dbError } = await supabase
        .from('user_profile')
        .insert([{ 
          id: data.user.id, 
          email: newUserEmail, 
          role: newUserRole 
        }]);

      if (dbError) throw dbError;

      // 3. Actualizar lista
      setUsers([{ 
        id: data.user.id, 
        email: newUserEmail, 
        role: newUserRole,
        last_sign_in_at: null ,
      }, ...users]);
      
      setNewUserEmail('');
      alert('Usuario creado. Debe cambiar su contraseña en el primer acceso.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h2>
        {currentUserRole === 'superadmin' && (
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center text-sm"
            onClick={() => document.getElementById('create-user-modal')?.showModal()}
          >
            <Plus className="h-4 w-4 mr-1" /> Crear Usuario
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

        <UserManagement />  

      {/* Modal para crear usuarios (solo superadmin) */}
      <dialog id="create-user-modal" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg shadow-xl max-w-md">
          <h3 className="font-bold text-lg mb-4">Crear Nuevo Usuario</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="user">Usuario Normal</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div className="modal-action mt-6">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleCreateUser}
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Usuario'}
            </button>
            <button 
              className="ml-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => document.getElementById('create-user-modal')?.close()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminUsersPage;
