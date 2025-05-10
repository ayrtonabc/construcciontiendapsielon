import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, FileText, MessageSquare } from 'lucide-react';
import { blogCRUD, orderCRUD, productCRUD, reviewCRUD } from '../../lib/supabaseCrud';
import BlogModal from '../../components/modalForms/BlogModal';
import ProductModal from '../../components/modalForms/ProductModal';

const AdminDashboardPage: React.FC = () => {
  const [counts,setCounts] =useState<number[]>([0,0,0,0])
 const[postsCounts,reviewsCount,productsCount,ordersCount]=counts
 const [isProductOpen,setIsProductOpen]=useState(false)
 const [isPostOpen,setIsPostOpen]=useState(false)

 const fetchCounts=async ()=>{
  const posts=blogCRUD.count()
  const reviews=reviewCRUD.count()
  const products=productCRUD.count()
  const orders=orderCRUD.count()
    const result=await Promise.all([products,reviews,posts,orders]) 
    setCounts(result)
  }
  
  const handleOpenProduct = () => {
      setIsProductOpen(true);
    };
  
    const handleCloseProduct = () => {
      setIsProductOpen(false);
    };

    const handleOnSaveProduct = () => {
      setIsProductOpen(false);
      fetchCounts()
    };

    const handleOpenPost = () => {
      setIsPostOpen(true);
    };
  
    const handleClosePost = () => {
      setIsPostOpen(false);
    };
    
    const handleOnSavePost = () => {
      setIsPostOpen(false);
      fetchCounts()
    };  


  useEffect(()=>{
    
    fetchCounts()
  },[])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <Package className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Produkty</p>
            <p className="text-2xl font-semibold text-gray-800">{postsCounts}</p> {/* Placeholder */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <ShoppingCart className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Nowe Zamówienia</p>
            <p className="text-2xl font-semibold text-gray-800">{ordersCount}</p> {/* Placeholder */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <FileText className="h-8 w-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Wpisy Blogowe</p>
            <p className="text-2xl font-semibold text-gray-800">{productsCount}</p> {/* Placeholder */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <MessageSquare className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Nowe Recenzje</p>
            <p className="text-2xl font-semibold text-gray-800">{reviewsCount}</p> {/* Placeholder */}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Szybkie Akcje</h3>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            onClick={handleOpenProduct}>
              Dodaj Produkt</button>
          <button 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
            onClick={handleOpenPost}
            >Napisz Post</button>
        </div>
      </div>
      <BlogModal isOpen={isPostOpen} onClose={handleClosePost} onSave={handleOnSavePost}  />
      <ProductModal isOpen={isProductOpen} onClose={handleCloseProduct} onSave={handleOnSaveProduct}  />

    </div>
  );
};

export default AdminDashboardPage;
