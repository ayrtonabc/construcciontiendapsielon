import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, Truck } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (submitError) {
      setError(submitError.message || 'An error occurred');
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-4 bg-[#04515E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 disabled:opacity-50"
      >
        {processing ? 'Przetwarzanie...' : `Zapłać ${(amount / 100).toFixed(2)} zł`}
      </button>
    </form>
  );
};

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', postalCode: '', country: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = item.price.replace(' zł', '').replace(',', '.');
      const price = parseFloat(priceString);
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = itemCount > 0 ? 15.00 : 0;
  const total = subtotal + shippingCost;
  const totalInCents = Math.round(total * 100);

  useEffect(() => {
    if (cartItems.length > 0) {
      // Create PaymentIntent
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ items: cartItems }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch(err => console.error('Error creating payment intent:', err));
    }
  }, [cartItems]);

  if (itemCount === 0) {
    return (
      <div className="py-12 md:py-16 bg-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white p-8 md:p-10 rounded-lg shadow-md">
            <p className="text-lg md:text-xl text-gray-600 mb-6">Twój koszyk jest pusty.</p>
            <Link
              to="/shop"
              className="inline-block bg-[#04515E] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-sm sm:text-base"
            >
              Kontynuuj Zakupy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12 flex items-center justify-center">
          <ShoppingCart className="h-7 w-7 md:h-8 md:w-8 mr-2 md:mr-3" /> Twój Koszyk
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Produkty ({itemCount})</h2>
              <button
                onClick={clearCart}
                className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium flex items-center self-end sm:self-center"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Wyczyść Koszyk
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b border-gray-100 pb-4 last:border-b-0">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow w-full">
                    <Link to={`/product/${item.productId}`} className="text-base md:text-lg font-medium text-gray-800 hover:text-[#04515E] line-clamp-2">{item.title}</Link>
                    <p className="text-xs sm:text-sm text-gray-500">Kolor: {item.color}, Rozmiar: {item.size}</p>
                    <p className="text-base md:text-lg font-semibold text-[#04515E] mt-1">{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center border border-gray-300 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-600 hover:text-black disabled:opacity-50" disabled={item.quantity <= 1}>
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                      <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-600 hover:text-black">
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 p-1 ml-3 sm:ml-0" title="Usuń produkt">
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary and Payment */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Order Summary */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 border-b border-gray-200 pb-3 md:pb-4">Podsumowanie</h2>
              <div className="space-y-2 md:space-y-3 text-sm sm:text-base text-gray-700">
                <div className="flex justify-between">
                  <span>Suma częściowa</span>
                  <span>{subtotal.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between">
                  <span>Wysyłka</span>
                  <span>{shippingCost.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg md:text-xl font-bold text-gray-900 pt-2 md:pt-3 border-t border-gray-200 mt-2 md:mt-3">
                  <span>Łącznie</span>
                  <span>{total.toFixed(2)} zł</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 border-b border-gray-200 pb-3 md:pb-4 flex items-center">
                <Truck className="h-5 w-5 md:h-6 md:w-6 mr-2" /> Dane do wysyłki
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04515E] focus:ring-[#04515E]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04515E] focus:ring-[#04515E]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Miasto</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04515E] focus:ring-[#04515E]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kod pocztowy</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04515E] focus:ring-[#04515E]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {clientSecret && (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 border-b border-gray-200 pb-3 md:pb-4">
                  Płatność
                </h2>
                <Elements stripe={stripePromise} options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#04515E',
                    },
                  },
                }}>
                  <CheckoutForm amount={totalInCents} />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;