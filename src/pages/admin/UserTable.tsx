/* import { User_Profile } from "../../types"
export default function UserTable(users:User_Profile[]){

    const handleUpdateRole = async (userId: string, newRole: string) => {
        if (!['superadmin', 'admin', 'user'].includes(newRole)) return;
        
        try {
          const { error } = await supabase
            .from('users')
            .update({ role: newRole })
            .eq('id', userId);
    
          if (error) throw error;
    
          setUsers(users.map(user => 
            user.id === userId ? { ...user, role: newRole as any } : user
          ));
        } catch (err) {
          setError(err.message);
        }
      };
    
      const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('¿Eliminar este usuario permanentemente?')) return;
        
        try {
          // 1. Eliminar de Auth (requiere permisos de servicio)
          const { error: authError } = await supabase.auth.admin.deleteUser(userId);
          if (authError) throw authError;
    
          // 2. Eliminar de la tabla users
          const { error: dbError } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
    
          if (dbError) throw dbError;
    
          // 3. Actualizar lista
          setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
          setError(err.message);
        }
      };
    
      const getRoleIcon = (role: string) => {
        switch (role) {
          case 'superadmin': return <Shield className="h-4 w-4 text-purple-500" />;
          case 'admin': return <Shield className="h-4 w-4 text-blue-500" />;
          default: return <User className="h-4 w-4 text-gray-500" />;
        }
      };

    
    return(<div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acceso</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    <span className="ml-2 capitalize">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Nunca'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {currentUserRole === 'superadmin' && (
                    <>
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className="text-sm border rounded p-1"
                        disabled={user.role === 'superadmin'}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                        {user.role === 'superadmin' && <option value="superadmin">Superadmin</option>}
                      </select>
                      <button 
                        className="text-red-600 hover:text-red-900" 
                        title="Eliminar"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === 'superadmin'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
} */
