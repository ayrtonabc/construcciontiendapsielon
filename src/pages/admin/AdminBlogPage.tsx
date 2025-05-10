import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { blogCRUD } from '../../lib/supabaseCrud';
import { BlogData } from '../../types';
import { formatDate } from '../../lib/utils';
import BlogModal from '../../components/modalForms/BlogModal';
import Feedback from '../../components/FeedBack'; // Import Feedback
import { Loader } from '../../components/Loader'; // Import Loader

const AdminBlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogData[]>([]);
  const [editingPost, setEditingPost] = useState<BlogData>(); // State for the post being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const result = await blogCRUD.getAll();
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
      setPosts(result);
    } catch (error: any) {
      setFeedback({ message: `Błąd ładowania postów: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Hide feedback after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleOpenModal = (post?: BlogData) => {
    setEditingPost(post);
    setIsModalOpen(true);
    setFeedback(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(undefined);
  };

  const handleSavePost = (savedPost: BlogData) => {
    setFeedback({ message: editingPost ? 'Post zaktualizowany pomyślnie!' : 'Post dodany pomyślnie!', type: 'success' });
    fetchBlogs(); // Refresh list
    handleCloseModal();
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten post? Tej akcji nie można cofnąć.')) {
      setFeedback(null);
      try {
        await blogCRUD.delete(postId);
        setFeedback({ message: 'Post usunięty pomyślnie!', type: 'success' });
        fetchBlogs(); // Refresh list
      } catch (error: any) {
        setFeedback({ message: `Błąd usuwania posta: ${error.message}`, type: 'error' });
      }
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Opublikowany': return 'bg-green-100 text-green-800';
      case 'Szkic': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Zarządzaj Wpisami Blogowymi</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center text-sm"
        >
          Napisz Nowy Post
        </button>
      </div>

      {feedback && <Feedback type={feedback.type} message={feedback.message} />}

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tytuł</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Akcje</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 && !loading ? (
                 <tr>
                   <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Brak postów do wyświetlenia.</td>
                 </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(post.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleOpenModal(post)}
                        className="text-indigo-600 hover:text-indigo-900 p-1" title="Edytuj">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-900 p-1" title="Usuń">
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

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePost}
        postToEdit={editingPost}
      />
    </div>
  );
};

export default AdminBlogPage;
