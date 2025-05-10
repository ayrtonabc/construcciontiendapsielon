import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { productCRUD } from '../../lib/supabaseCrud';
import { Product } from '../../types';
import ProductModal from '../../components/modalForms/ProductModal'; // Import the modal
import Feedback from '../../components/FeedBack'; // Import Feedback component

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const result = await productCRUD.getAll();
      // Sort by name for consistency
      result.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(result);
    } catch (error: any) {
      setFeedback({ message: `Błąd ładowania produktów: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product: Product | null = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
    setFeedback(null); // Clear feedback when opening modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    setFeedback({ message: productToEdit ? 'Produkt zaktualizowany pomyślnie!' : 'Produkt dodany pomyślnie!', type: 'success' });
    fetchProducts(); // Refresh the list after saving
    handleCloseModal();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten produkt? Tej akcji nie można cofnąć.')) {
      setFeedback(null);
      try {
        await productCRUD.delete(productId);
        setFeedback({ message: 'Produkt usunięty pomyślnie!', type: 'success' });
        fetchProducts(); // Refresh the list
      } catch (error: any) {
        setFeedback({ message: `Błąd usuwania produktu: ${error.message}`, type: 'error' });
      }
    }
  };

  // Hide feedback after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Zarządzaj Produktami</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center text-sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Dodaj Produkt
        </button>
      </div>

      {feedback && <Feedback type={feedback.type} message={feedback.message} />}

      {loading ? (
        <div className="text-center py-10">Ładowanie produktów...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zdjęcie</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nazwa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena (PLN)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stan Mag.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoria</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Akcje</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">Brak produktów do wyświetlenia.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2)} zł</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock ?? 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="text-indigo-600 hover:text-indigo-900" title="Edytuj"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900" title="Usuń"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default AdminProductsPage;
