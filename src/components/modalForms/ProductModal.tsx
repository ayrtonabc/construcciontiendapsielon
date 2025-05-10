import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { useFormHandler } from '../../hooks/useFormHandler';
import { productCRUD,IMAGE_BUCKECT } from '../../lib/supabaseCrud';
import Feedback from '../FeedBack';
import { Product } from '../../types';
import { supabase } from '../../lib/supabase'; // Import supabase client

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const categories= ["Obroże", "Szelki", "Akcesoria", "Tagi NFC"];

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const {
    formState: { product, error, isLoading },
    handleProductChange,
    resetProductForm,
    startSubmission,
    submissionSuccess,
    submissionError
  } = useFormHandler();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productToEdit) {
      resetProductForm(productToEdit);
      setPreviewUrl(productToEdit.image_url || null); // Set preview from existing URL
      setImageFile(null); // Clear file input if editing
    } else {
      resetProductForm();
      setPreviewUrl(null);
      setImageFile(null);
    }
  }, [productToEdit, isOpen]); // Reset form when modal opens or productToEdit changes

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleProductChange('image_url',reader.result as string); // Clear existing URL if new file is selected // Clear existing URL if new file is selected
    } else {
      setImageFile(null);
      setPreviewUrl(product.image_url || null); // Revert to existing URL if selection is cancelled
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`; // Store in 'product_images' folder
      
      const { error: uploadError } = await supabase.storage
        .from(IMAGE_BUCKECT) // Specify the bucket name
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from(IMAGE_BUCKECT)
        .getPublicUrl(filePath);
      return data?.publicUrl || null;

    } catch (error) {
      console.error('Error uploading image:', error);
      submissionError(`Błąd podczas przesyłania obrazu: ${error.message}`);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startSubmission();
    let imageUrl = product.image_url; // Keep existing URL by default

    // Upload new image if selected
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        // Error handled in uploadImage function
        return;
      }
      imageUrl = uploadedUrl;
    }

    const productDataToSave = {
      ...product,
      image_url: imageUrl,
      price: Number(product.price) || 0, // Ensure price is a number
      stock: Number(product.stock) || 0, // Ensure stock is a number
    };

    try {
      let savedProduct: Product;
      if (productToEdit) {
        // Update existing product
        savedProduct = await productCRUD.update(productToEdit.id, {...product,image_url:imageUrl});
      } else {
        // Create new product
        savedProduct = await productCRUD.create({...product,image_url:imageUrl});
      }
      submissionSuccess();
      onSave(savedProduct); // Pass saved product back to parent
      onClose(); // Close modal on success
    } catch (err: any) {
      submissionError(err.message || 'Wystąpił nieznany błąd.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">{productToEdit ? 'Edytuj Produkt' : 'Dodaj Nowy Produkt'}</h3>
        {error && <Feedback type="error" message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4 [&_label:has(+*:required)]:after:content-['*'] [&_label:has(+*:required)]:after:ml-0.5 [&_label:has(+*:required)]:after:text-red-500">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zdjęcie Produktu</label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Podgląd" className="mx-auto h-24 w-auto rounded" />
                ) : (
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <span className="relative bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    {previewUrl ? 'Zmień plik' : 'Prześlij plik'}
                  </span>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {!previewUrl && <p className="pl-1">lub przeciągnij i upuść</p>}
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF do 10MB</p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nazwa Produktu</label>
            <input
              type="text" id="name" name="name" value={product.name}
              onChange={(e) => handleProductChange("name", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nazwa produktu"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Cena (PLN)</label>
            <input
              type="number" id="price" name="price" value={product.price} step="0.01" min="0"
              onChange={(e) => handleProductChange("price", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stan Magazynowy</label>
            <input
              type="number" id="stock" name="stock" value={product.stock ?? ''} min="0"
              onChange={(e) => handleProductChange("stock", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
            <select
              id="category" name="category" value={product.category} required
              onChange={(e) => handleProductChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
            <textarea
              id="description" name="description" rows={4} value={product.description||""}
              onChange={(e) => handleProductChange("description", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Opis produktu..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Zapisywanie...' : (productToEdit ? 'Zapisz Zmiany' : 'Dodaj Produkt')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
