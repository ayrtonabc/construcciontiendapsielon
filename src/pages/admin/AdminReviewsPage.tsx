import React, { useEffect, useState } from 'react';
import { Star, Check, Trash2 } from 'lucide-react';
import {  Review } from '../../types';
import { reviewCRUD } from '../../lib/supabaseCrud';
import { formatDate } from '../../lib/utils';

const AdminReviewsPage: React.FC = () => {
    const [reviews,setReviews]=useState<Review[]|null>(null)
  
    useEffect(()=>{
      const fetchReviews=async()=>{
        const result=await reviewCRUD.getAll()
        setReviews(result)
      }
      fetchReviews()
    })

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Zatwierdzona': return 'bg-green-100 text-green-800';
      case 'Oczekująca': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Zarządzaj Recenzjami</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {reviews&&
        <ul className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <li key={review.id} className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.author}</p>
                  <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(review.status)}`}>
                  {review.status}
                </span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-3">{review.text}</p>
              <div className="flex justify-end space-x-2">
                {review.status === 'Oczekująca' && (
                  <button className="text-green-600 hover:text-green-900 p-1" title="Zatwierdź">
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button className="text-red-600 hover:text-red-900 p-1" title="Usuń" onClick={()=>reviewCRUD.delete(review.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        }
      </div>
    </div>
  );
};

export default AdminReviewsPage;
