import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { Order } from '../../types';
import { orderCRUD } from '../../lib/supabaseCrud';
import OrderDetailsModal from '../../components/modalForms/OrderDetailsModal'; // Import the modal
import Feedback from '../../components/FeedBack'; // Import Feedback component
import { Loader } from '../../components/Loader'; // Import Loader

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch only summary data initially
        const result = await orderCRUD.getAll();
        // Sort by date descending
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(result);
      } catch (err: any) {
        setError(`Błąd ładowania zamówień: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); // Fetch only once on mount

  const handleViewDetails = async (orderId: string) => {
    setError(null);
    try {
      // Fetch full details for the selected order
      const fullOrderDetails = await orderCRUD.getById(orderId);
      setSelectedOrder(fullOrderDetails);
      setIsModalOpen(true);
    } catch (err: any) {
      setError(`Błąd ładowania szczegółów zamówienia: ${err.message}`);
      setSelectedOrder(null); // Clear selection on error
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Nowe': return 'bg-blue-100 text-blue-800';
      case 'Wysłane': return 'bg-yellow-100 text-yellow-800';
      case 'Dostarczone': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Zarządzaj Zamówieniami</h2>

      {error && <Feedback type="error" message={error} />}

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Zam.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klient</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suma (PLN)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Akcje</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center">
                  <Loader />
                </td>
              </tr>
            ) : orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">{order.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total.toFixed(2)} zł</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      title="Zobacz szczegóły"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">Brak zamówień do wyświetlenia.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default AdminOrdersPage;
