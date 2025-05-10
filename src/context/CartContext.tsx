import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem {
  id: string; // Unique identifier for the cart item (e.g., product.id + color + size)
  productId: string;
  title: string;
  price: string; // Keep as string for now, parse when calculating total
  color: string;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setCartItems((prevItems) => {
      const cartItemId = `${item.productId}-${item.color}-${item.size}`;
      const existingItem = prevItems.find((i) => i.id === cartItemId);

      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item
        return [...prevItems, { ...item, id: cartItemId, quantity: 1 }];
      }
    });
     console.log("Cart updated:", cartItems); // Log state *after* update attempt
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item // Ensure quantity doesn't go below 0
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

   const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
