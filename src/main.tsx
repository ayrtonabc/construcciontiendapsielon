import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop /> {/* Add ScrollToTop here */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
