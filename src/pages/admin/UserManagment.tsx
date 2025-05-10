import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User_Profile } from '../../types';
import { orderUsers } from '../../lib/utils';

const rolType={
  superadmin: "bg-gray-200 text-gray-500 cursor-not-allowed" ,
  admin:"bg-red-600 text-white hover:bg-red-700",
  user:"bg-red-600 text-white hover:bg-red-700",
  banned:  "bg-black text-white hover:opacity-100 opacity-80",
}
const tableHeads=["Nombre","Email","Rol","Acciones"] as const

export default function UserManagement() {
  const [users, setUsers] = useState<User_Profile[]>([]);
  const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const fetchUsers = async () => {
   
    try {
        const { data, error } = await supabase
      .from('user_profiles')
      .select();      
        
      if (error) {
        throw new Error()
      } else {
        const orderedUsers=orderUsers(data)
        if(data)setUsers(orderedUsers);
      }
    }catch(error) {
      setFeedback({message: 'Error al cargar usuarios', type: 'error'});}
  };

  const updateRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (!error) {
      setFeedback({message: 'Rol actualizado correctamente', type: 'success'});
      fetchUsers();
    } else {
      setFeedback({message: 'Error al actualizar rol', type: 'error'});
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ocultar feedback después de 3 segundos
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className=" ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Zarządzaj użytkownikami</h1>
      
      {feedback && (
        <div className={`mb-4 p-3 rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback.message}
        </div>
      )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeads.map(head=>(
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                 {/*  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone || '-'}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      disabled={ user.role === 'banned'}
                      onChange={(e) => updateRole(user.user_id, e.target.value)}
                      className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${
                        user.role === 'superadmin' ? 'bg-gray-100 ' : 'bg-white'
                      }`}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                      <option value="superadmin">Superadmin</option>
                      <option value="banned">Baneado</option>

                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="space-x-2">
                      <button
                        onClick={() => updateRole(user.user_id, user.role==="banned"?"user":'banned')}
                        disabled={user.role === 'superadmin' || user.role === 'admin'}
                        className={`inline-flex transition items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md ${
                          rolType[user.role]
                        }`}
                      >
                       {user.role!=="banned"? "Suspender":"Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
