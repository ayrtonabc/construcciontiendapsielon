import React, { useEffect } from "react";
import { useFormHandler } from "../../hooks/useFormHandler";
import { blogCRUD } from "../../lib/supabaseCrud";
import Feedback from "../FeedBack";
import { BlogData } from "../../types";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogData) => void;
  postToEdit?: BlogData ;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, onSave, postToEdit }) => {
  const {
    formState: { blog, error, isLoading },
    handleBlogChange,
    resetBlogForm,
    startSubmission,
    submissionSuccess,
    submissionError
  } = useFormHandler();

  // Initialize form when modal opens or postToEdit changes
  useEffect(() => {
    if (isOpen) {
      resetBlogForm(postToEdit);
    }
  }, [isOpen, postToEdit]); // Depend on isOpen and postToEdit

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startSubmission();
    try {
      const blogDataToSave = {
        ...blog,
        date: blog.date || new Date().toISOString().split('T')[0], // Ensure date has a value
      };

      let savedPost: BlogData;
      if (postToEdit) {
        savedPost = await blogCRUD.update(postToEdit.id, blogDataToSave);
      } else {
        savedPost = await blogCRUD.create(blogDataToSave);
      }
      submissionSuccess();
      onSave(savedPost); // Pass saved post back
      onClose(); // Close modal on success
    } catch (err: any) {
      submissionError(err.message || 'Wystąpił nieznany błąd.');
    }
  };

  if (!isOpen) return null;

  // Format date for input field (handle potential undefined initial state)
  const dateForInput = blog.date ? new Date(blog.date).toISOString().split('T')[0] : '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">{postToEdit ? 'Edytuj Wpis' : 'Napisz Nowy Wpis'}</h3>
        {error && <Feedback type="error" message={error} />}
        <form onSubmit={handleBlogSubmit} className="space-y-4 [&_label:has(+*:required)]:after:content-['*'] [&_label:has(+*:required)]:after:ml-0.5 [&_label:has(+*:required)]:after:text-red-500">

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
            <input
              type="text" id="title" name="title" value={blog.title}
              onChange={(e) => handleBlogChange("title", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Tytuł wpisu blogowego"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input
              type="text" id="author" name="author" value={blog.author}
              onChange={(e) => handleBlogChange("author", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Imię i nazwisko autora"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data Publikacji</label>
            <input
              type="date" id="date" name="date" value={dateForInput}
              onChange={(e) => handleBlogChange("date", e.target.value)} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status" name="status" value={blog.status} required
              onChange={(e) => handleBlogChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="Opublikowany">Opublikowany</option>
              <option value="Szkic">Szkic</option>
            </select>
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Obrazek (URL, Opcjonalnie)</label>
            <input
              type="url" id="image" name="image" value={blog.image || ''}
              onChange={(e) => handleBlogChange("image", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="https://przyklad.com/obrazek.jpg"
            />
          </div>

          {/* Excerpt (Optional) */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Krótki Opis (Opcjonalnie)</label>
            <textarea
              id="excerpt" name="excerpt" rows={3} value={blog.excerpt || ''}
              onChange={(e) => handleBlogChange("excerpt", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Krótki opis lub zajawka wpisu..."
            ></textarea>
          </div>

          {/* Content (Optional) */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Treść (Opcjonalnie)</label>
            <textarea
              id="content" name="content" rows={6} value={blog.content || ''}
              onChange={(e) => handleBlogChange("content", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Pełna treść wpisu blogowego..."
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Zapisywanie...' : (postToEdit ? 'Zapisz Zmiany' : 'Opublikuj Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogModal;
