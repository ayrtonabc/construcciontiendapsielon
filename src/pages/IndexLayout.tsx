import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag, Menu, X, Mail, Instagram } from 'lucide-react'; // Import Mail and Instagram icons
import { useCart } from '../context/CartContext';

export default function IndexPage() {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f5f2ed] font-montserrat">
      {/* Nawigacja */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo always on the left */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
                <img src="/logo.png" alt="psielon logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Mobile Menu Button (Right) */}
            <div className="md:hidden flex items-center">
               <Link to="/cart" className="relative text-gray-600 hover:text-[#04515E] mr-4">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </Link>
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#04515E]"
                aria-expanded="false"
              >
                <span className="sr-only">Otwórz menu główne</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop Navigation Links (Right) */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/shop" className="text-gray-600 hover:text-[#04515E]">SKLEP</Link>
              <Link to="/about" className="text-gray-600 hover:text-[#04515E]">O NAS</Link>
              <Link to="/reviews" className="text-gray-600 hover:text-[#04515E]">RECENZJE</Link>
              <Link to="/blog" className="text-gray-600 hover:text-[#04515E]">BLOG</Link>
              <Link to="/cart" className="relative text-gray-600 hover:text-[#04515E]">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-40`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/shop" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#04515E] hover:bg-gray-50">SKLEP</Link>
            <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#04515E] hover:bg-gray-50">O NAS</Link>
            <Link to="/reviews" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#04515E] hover:bg-gray-50">RECENZJE</Link>
            <Link to="/blog" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#04515E] hover:bg-gray-50">BLOG</Link>
          </div>
        </div>
      </nav>

      {/* Główna zawartość */}
      <main>
        <Outlet/>
      </main>

      {/* Stopka - Updated background color and layout */}
      <footer className="bg-[#04515E] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Adjusted grid layout for 3 columns on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo and description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4 md:mb-6">
                 {/* Use white logo for dark background */}
                 <img src="/logoblanco.png" alt="psielon logo" className="h-8 w-auto mr-2" />
              </div>
              <p className="text-sm text-gray-300 mb-6">Utrzymywanie bezpieczeństwa i łączności zwierząt dzięki innowacyjnej technologii.</p> {/* Adjusted text color for contrast */}
               {/* Newsletter Removed */}
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-1">
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Szybkie Linki</h3>
              <ul className="space-y-2 md:space-y-3 text-sm text-gray-300"> {/* Adjusted text color */}
                <li><Link to="/shop" className="hover:text-white transition duration-300">Sklep</Link></li>
                <li><Link to="/about" className="hover:text-white transition duration-300">O Nas</Link></li>
                <li><Link to="/" className="hover:text-white transition duration-300">Jak To Działa</Link></li>
                <li><Link to="/blog" className="hover:text-white transition duration-300">Blog</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition duration-300">Recenzje</Link></li>
              </ul>
            </div>

            {/* Column 3: Kontakt */}
            <div className="md:col-span-1">
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Kontakt</h3>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-300"> {/* Adjusted text color and spacing */}
                <li>
                  <a href="mailto:kontakt@psielon.com" className="hover:text-white transition duration-300 flex items-center">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0"/> {/* Added flex-shrink-0 */}
                    <span>kontakt@psielon.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/psielon.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition duration-300 flex items-center"
                    aria-label="Instagram Psielon"
                  >
                    <Instagram className="h-5 w-5 mr-2 flex-shrink-0"/> {/* Adjusted size slightly, added flex-shrink-0 */}
                    <span>Instagram</span>
                  </a>
                </li>
                {/* Add more contact info here if needed */}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-10 md:mt-12 border-t border-gray-700 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400"> {/* Adjusted text color */}
            &copy; {new Date().getFullYear()} psielon. Wszelkie prawa zastrzeżone.
          </div>
          {/* Added Developer Credit Line */}
          <div className="mt-4 text-center text-xs text-gray-400"> {/* Adjusted text color */}
            Stworzone z ❤️ przez{' '}
            <a
              href="https://jestemprogramista.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300" /* Adjusted link colors */
            >
              jestem programista
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
