import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect to /admin after login/signup, unless already logged in
  const redirectTo = '/admin';

  useEffect(() => {
    if (!loadingAuth && user) {
      // If user is already logged in, redirect them away from login page
      // Use location state 'from' if available and not login itself, otherwise default
      const from = location.state?.from && location.state.from !== '/login' ? location.state.from : '/';
      navigate(from, { replace: true });
    }
  }, [user, loadingAuth, navigate, location.state]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) return; // Should not happen due to useEffect redirect, but good practice

    // Basic validation for registration
    if (!isLogin && username.trim() === "") {
      setError("Pole nazwy użytkownika nie może być puste.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        navigate(redirectTo, { replace: true }); // Redirect to /admin after login

      } else {
        // Registration
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: username, // Use 'first_name' as per Supabase convention
            }
            // emailRedirectTo: `${window.location.origin}/admin` // Optional: Redirect after email confirmation
          }
        });

        if (signUpError) {
          // Provide more user-friendly error messages if possible
          if (signUpError.message.includes("User already registered")) {
             setError("Użytkownik o tym adresie e-mail już istnieje.");
          } else {
             setError(signUpError.message);
          }
          throw signUpError; // Still throw to stop execution
        }

        // Don't show alert, email confirmation is usually disabled by default in Supabase
        // alert('Rejestracja udana! Sprawdź swój e-mail, aby potwierdzić konto.'); // Remove or keep based on Supabase settings
        navigate(redirectTo, { replace: true }); // Redirect to /admin after registration
      }
    } catch (err: any) {
      // Avoid setting generic error if already set
      if (!error) {
         setError(err.message || 'Wystąpił nieznany błąd.');
      }
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) {
    return <Loader />; // Show loader while checking auth state
  }

  // If user is logged in, this component shouldn't render (handled by useEffect)
  // But as a fallback, we can return null or a redirect here too.
  if (user) {
     return null; // Or <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Replaced h2 with logo */}
        <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt="psielon logo"
        />
        {/* Optional: Add a smaller title below the logo if needed */}
        {/* <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          {isLogin ? 'Logowanie' : 'Rejestracja'}
        </h2> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nazwa użytkownika
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adres e-mail
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  {/* Link to password recovery - implement this page if needed */}
                  {/* <Link
                    to="/odzyskaj-haslo" // Example path
                    className="font-medium text-brand-primary hover:text-brand-primary-hover"
                  >
                    Zapomniałeś hasła?
                  </Link> */}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  'Przetwarzanie...'
                ) : isLogin ? (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Zaloguj się
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 mr-2" />
                    Zarejestruj się
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'Nowy w sklepie?' : 'Masz już konto?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null); // Clear errors when switching modes
                  // Clear fields when switching to prevent confusion
                  setEmail('');
                  setPassword('');
                  setUsername('');
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Utwórz nowe konto' : 'Zaloguj się'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
