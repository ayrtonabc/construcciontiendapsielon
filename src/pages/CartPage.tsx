import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, Truck } from 'lucide-react';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', postalCode: '', country: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Informacje o wysyłce:", shippingInfo);
    alert("Informacje zapisane w konsoli.");
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

  return (
    <div className="py-12 md:py-16 bg-[#f5f2ed]"> {/* Adjusted padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12 flex items-center justify-center"> {/* Adjusted text size */}
          <ShoppingCart className="h-7 w-7 md:h-8 md:w-8 mr-2 md:mr-3" /> Twój Koszyk {/* Adjusted size */}
        </h1>

        {itemCount === 0 ? (
          <div className="text-center bg-white p-8 md:p-10 rounded-lg shadow-md"> {/* Adjusted padding */}
            <p className="text-lg md:text-xl text-gray-600 mb-6">Twój koszyk jest pusty.</p> {/* Adjusted text size */}
            <Link
              to="/shop"
              className="inline-block bg-[#04515E] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-sm sm:text-base" /* Adjusted padding/text size and colors */
            >
              Kontynuuj Zakupy
            </Link>
          </div>
        ) : (
          // Grid stacks on mobile, side-by-side on lg+
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Pozycje w koszyku */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-6 pb-3 md:pb-4 border-b border-gray-200"> {/* Stack on mobile */}
                 <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Produkty ({itemCount})</h2> {/* Adjusted text size */}
                 <button
                    onClick={clearCart}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium flex items-center self-end sm:self-center" /* Adjusted text size, alignment */
                 >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Wyczyść Koszyk {/* Adjusted size */}
                 </button>
              </div>

              <div className="space-y-4 md:space-y-6"> {/* Adjusted spacing */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b border-gray-100 pb-4 last:border-b-0"> {/* Stack on mobile */}
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-grow w-full">
                      <Link to={`/product/${item.productId}`} className="text-base md:text-lg font-medium text-gray-800 hover:text-[#04515E] line-clamp-2">{item.title}</Link> {/* Adjusted text size and hover color */}
                      <p className="text-xs sm:text-sm text-gray-500">Kolor: {item.color}, Rozmiar: {item.size}</p> {/* Adjusted text size */}
                      <p className="text-base md:text-lg font-semibold text-[#04515E] mt-1">{item.price}</p> {/* Adjusted text size and color */}
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto"> {/* Full width on mobile */}
                      <div className="flex items-center border border-gray-300 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1"> {/* Adjusted padding */}
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-600 hover:text-black disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size */}
                        </button>
                        <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium">{item.quantity}</span> {/* Adjusted text size */}
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-600 hover:text-black">
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size */}
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 p-1 ml-3 sm:ml-0" title="Usuń produkt">
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Adjusted size */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Podsumowanie zamówienia i wysyłka */}
            <div className="lg:col-span-1 space-y-6 md:space-y-8"> {/* Adjusted spacing */}
               {/* Podsumowanie zamówienia */}
               <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
                 <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 border-b border-gray-200 pb-3 md:pb-4">Podsumowanie</h2> {/* Adjusted text size */}
                 <div className="space-y-2 md:space-y-3 text-sm sm:text-base text-gray-700"> {/* Adjusted text size */}
                    <div className="flex justify-between"><span>Suma częściowa</span> <span>{subtotal.toFixed(2)} zł</span></div>
                    <div className="flex justify-between"><span>Wysyłka</span> <span>{shippingCost.toFixed(2)} zł</span></div>
                    <div className="flex justify-between text-base sm:text-lg md:text-xl font-bold text-gray-900 pt-2 md:pt-3 border-t border-gray-200 mt-2 md:mt-3"> {/* Adjusted text size */}
                       <span>Łącznie</span> <span>{total.toFixed(2)} zł</span>
                    </div>
                 </div>
               </div>

              {/* Informacje o wysyłce */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 border-b border-gray-200 pb-3 md:pb-4 flex items-center"> {/* Adjusted text size */}
                   <Truck className="h-5 w-5 md:h-6 md:w-6 mr-2" /> Wysyłka {/* Adjusted size */}
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-3 md:space-y-4"> {/* Adjusted spacing */}
                  {/* Form fields with adjusted text size */}
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Imię i Nazwisko</label>
                    <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] text-sm sm:text-base" /> {/* Updated focus color */}
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Adres</label>
                    <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] text-sm sm:text-base" /> {/* Updated focus color */}
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4"> {/* Adjusted gap */}
                    <div>
                      <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Miasto</label>
                      <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] text-sm sm:text-base" /> {/* Updated focus color */}
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Kod Pocztowy</label>
                      <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] text-sm sm:text-base" /> {/* Updated focus color */}
                    </div>
                  </div>
                   <div>
                    <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Kraj</label>
                    <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] text-sm sm:text-base" /> {/* Updated focus color */}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-3 md:mt-4 bg-[#04515E] text-white px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-sm sm:text-base" /* Adjusted padding/text size and colors */
                  >
                    Do Kasy (Placeholder)
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
