import { LogOut } from "lucide-react";
import { handleLogout } from "../../hooks/useAuth";


export default function LogoutButton(){

    
    return(
        <button
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
    )

}
