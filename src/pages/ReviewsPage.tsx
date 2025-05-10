import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import StarRatingInput from '../components/StarRatingInput';

// Placeholder reviews
const existingReviews = [
  { id: 1, author: "Opiekun Budiego", rating: 5, text: "Obroża psielon jest fantastyczna! Znalazłem Budiego w ciągu kilku minut.", timestamp: "2 dni temu" },
  { id: 2, author: "Mama Luny", rating: 4, text: "Świetny produkt i spokój ducha. Skóra mogłaby być miększa.", timestamp: "5 dni temu" },
  { id: 3, author: "Max i Właściciel", rating: 5, text: "Proste, skuteczne i dobrze wygląda. Gorąco polecam!", timestamp: "1 tydzień temu" },
];

function ReviewsPage() {
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [userTestimonial, setUserTestimonial] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState(existingReviews);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating > 0 && userName.trim() && userTestimonial.trim()) {
      const newReview = { id: Date.now(), author: userName, rating: userRating, text: userTestimonial, timestamp: "Przed chwilą" };
      setSubmittedReviews([newReview, ...submittedReviews]);
      setUserRating(0); setUserName(''); setUserTestimonial('');
      setSubmitMessage("Dziękujemy za Twoją recenzję!");
      setTimeout(() => setSubmitMessage(null), 4000);
    } else {
       setSubmitMessage("Proszę podać imię, ocenę i treść recenzji.");
       setTimeout(() => setSubmitMessage(null), 4000);
    }
  };

  return (
    <div className="py-12 md:py-16 bg-[#f5f2ed]"> {/* Adjusted padding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">Recenzje Klientów</h1> {/* Adjusted text size */}

        {/* Formularz dodawania recenzji */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-10 md:mb-12"> {/* Adjusted padding/margin */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 md:mb-6 flex items-center"> {/* Adjusted text size */}
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6 mr-2 text-[#04515E]" /> Zostaw Recenzję {/* Adjusted size and color */}
          </h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4 md:space-y-5"> {/* Adjusted spacing */}
            <div>
              <label htmlFor="userName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Twoje Imię</label> {/* Adjusted text size */}
              <input
                type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)}
                placeholder="Wpisz swoje imię" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] transition duration-150 text-sm sm:text-base" /* Adjusted padding/text size and focus color */
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Twoja Ocena</label> {/* Adjusted text size */}
              {/* StarRatingInput likely needs internal adjustments if not already responsive */}
              <StarRatingInput rating={userRating} setRating={setUserRating} />
            </div>
            <div>
              <label htmlFor="userTestimonial" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Twoja Opinia</label> {/* Adjusted text size */}
              <textarea
                id="userTestimonial" rows={4} value={userTestimonial} onChange={(e) => setUserTestimonial(e.target.value)}
                placeholder="Podziel się swoim doświadczeniem..." required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] transition duration-150 text-sm sm:text-base" /* Adjusted padding/text size and focus color */
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0"> {/* Stack on mobile */}
               <button
                 type="submit"
                 className="w-full sm:w-auto inline-flex items-center px-5 py-2 sm:px-6 sm:py-2 bg-[#04515E] text-white rounded-md font-semibold hover:bg-[#03414b] transition duration-300 disabled:opacity-60 text-xs sm:text-sm" /* Adjusted padding/text size and colors */
                 disabled={!userName.trim() || userRating === 0 || !userTestimonial.trim()}
               >
                 <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Wyślij Recenzję {/* Adjusted size */}
               </button>
               {submitMessage && <p className="text-xs sm:text-sm text-green-600 font-medium text-center sm:text-right">{submitMessage}</p>} {/* Adjusted text size */}
            </div>
          </form>
        </div>

        {/* Wyświetlanie istniejących recenzji */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">Co Mówią Klienci</h2> {/* Adjusted text size */}
          <div className="space-y-6 md:space-y-8"> {/* Adjusted spacing */}
            {submittedReviews.length > 0 ? (
              submittedReviews.map((review) => (
                <div key={review.id} className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-100"> {/* Adjusted padding */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3"> {/* Adjusted margin */}
                    <span className="font-semibold text-gray-800 text-sm sm:text-lg">{review.author}</span> {/* Adjusted text size */}
                    <span className="text-xs text-gray-500">{review.timestamp}</span>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-3"> {/* Adjusted margin */}
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${ i < review.rating ? 'text-yellow-400' : 'text-gray-300' }`} /* Adjusted size */
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{review.text}</p> {/* Adjusted text size */}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-center py-6 text-sm sm:text-base">Bądź pierwszym, który zostawi recenzję!</p> /* Adjusted text size */
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
