import React from 'react';
import { X, Package, CreditCard, Truck, User } from 'lucide-react';
import { Order, OrderItem, ShippingAddress } from '../../types';
import { formatDate } from '../../lib/utils';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const renderItems = (items: OrderItem[] | null | undefined) => {
    if (!items || items.length === 0) {
      return <p className="text-sm text-gray-500 italic">Brak informacji o produktach.</p>;
    }
    return (
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li key={item.product_id || index} className="py-3 flex items-center space-x-3">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} className="h-12 w-12 rounded-md object-cover flex-shrink-0" />
            ) : (
              <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">Ilość: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {(item.price * item.quantity).toFixed(2)} zł
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const renderShippingAddress = (address: ShippingAddress | null | undefined) => {
    if (!address) {
      return <p className="text-sm text-gray-500 italic">Brak adresu wysyłki.</p>;
    }
    return (
      <div className="text-sm text-gray-700 space-y-1">
        <p>{address.address}</p>
        <p>{address.postal_code} {address.city}</p>
        <p>{address.country}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Zamknij"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-semibold mb-5 border-b pb-3 text-gray-800">Szczegóły Zamówienia #{order.id.substring(0, 8)}...</h3>

        <div className="space-y-6">
          {/* Order Summary Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Klient</p>
              <p className="font-medium text-gray-800">{order.customer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Data</p>
              <p className="font-medium text-gray-800">{formatDate(order.date)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="font-medium text-gray-800">{order.status}</p>
            </div>
          </div>

          {/* Purchased Items */}
          <section>
            <h4 className="text-md font-semibold mb-3 flex items-center text-gray-700">
              <Package className="h-5 w-5 mr-2 text-gray-500" /> Zakupione Produkty
            </h4>
            <div className="bg-gray-50 p-4 rounded-md border">
              {renderItems(order.items)}
              <div className="mt-3 pt-3 border-t flex justify-end font-bold text-gray-800">
                Łącznie: {order.total.toFixed(2)} zł
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h4 className="text-md font-semibold mb-2 flex items-center text-gray-700">
              <CreditCard className="h-5 w-5 mr-2 text-gray-500" /> Metoda Płatności
            </h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
              {order.payment_method || <span className="italic text-gray-500">Brak informacji</span>}
            </p>
          </section>

          {/* Shipping Details */}
          <section>
            <h4 className="text-md font-semibold mb-2 flex items-center text-gray-700">
              <Truck className="h-5 w-5 mr-2 text-gray-500" /> Dane Wysyłki
            </h4>
            <div className="bg-gray-50 p-4 rounded-md border space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center"><User className="h-3 w-3 mr-1"/>Odbiorca</p>
                <p className="text-sm font-medium text-gray-800">
                  {order.recipient_name || <span className="italic text-gray-500">Brak informacji</span>}
                </p>
              </div>
              <div>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Adres</p>
                 {renderShippingAddress(order.shipping_address)}
              </div>
            </div>
          </section>
        </div>

        {/* Footer Close Button */}
        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
