import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { BlogData } from '../types';
import { blogCRUD } from '../lib/supabaseCrud';
import { formatDate } from '../lib/utils';
import { Loader } from '../components/Loader'; // Import Loader

function BlogListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogData[] | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await blogCRUD.getAll();
        // Filter only published posts for the public list
        const publishedPosts = data.filter(post => post.status === 'Opublikowany');
        // Sort published posts by date descending
        publishedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogPosts(publishedPosts);
      } catch (err: any) {
        setError(`Błąd ładowania postów: ${err.message}`);
        setBlogPosts([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []); // Fetch only once on mount

  return (
    <div className="py-12 md:py-16 bg-[#d69f47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">Blog psielon</h1>

        {loading && <Loader />}
        {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</p>}

        {!loading && !error && (
          blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blogPosts.map((post) => (
                <div key={post.id} className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative overflow-hidden h-56 sm:h-64">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          Brak obrazka
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 md:mb-3">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span>{formatDate(post.date)}</span>
                      <span className="mx-1 sm:mx-2">|</span>
                      <span className="truncate">Autor: {post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-[#04515E] transition duration-300 line-clamp-2">{post.title}</h2>
                    </Link>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 md:mb-4 flex-grow line-clamp-3">{post.excerpt || 'Brak krótkiego opisu.'}</p>
                    <Link to={`/blog/${post.id}`} className="mt-auto flex items-center text-[#04515E] font-semibold group-hover:text-[#03414b] text-sm sm:text-base">
                      Czytaj Dalej <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 bg-white p-6 rounded-md shadow">Brak opublikowanych postów.</p>
          )
        )}
        {/* Pagination placeholder */}
      </div>
    </div>
  );
}

export default BlogListPage;
