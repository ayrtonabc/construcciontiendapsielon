import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, MessageSquare, Send } from 'lucide-react';
import { blogCRUD, get_reviews_blog, reviewCRUD } from '../lib/supabaseCrud'; // Assuming reviewCRUD handles comments
import { BlogData, Review } from '../types';
import { formatDate } from '../lib/utils';
import { Loader } from '../components/Loader'; // Import Loader
import Feedback from '../components/FeedBack'; // Import Feedback

function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogData | null>(null);
  const [comments, setComments] = useState<Review[] | null>(null);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) {
        setError("Nieprawidłowy identyfikator posta.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const foundPost = await blogCRUD.getById(postId);
        // Ensure only published posts are viewable publicly
        if (foundPost && foundPost.status === 'Opublikowany') {
          setPost(foundPost);
          // Fetch comments associated with this blog post (adjust if needed)
          // Assuming 'get_reviews_blog' fetches comments linked to the blog post ID
          const blogReviews = await get_reviews_blog(postId);
          // Filter comments to show only 'Zatwierdzona' (Approved) status
          setComments(blogReviews.filter(c => c.status === 'Zatwierdzona'));
        } else {
          setError("Nie znaleziono wpisu lub nie jest on opublikowany.");
          setPost(null);
        }
      } catch (err: any) {
        setError(`Błąd ładowania posta: ${err.message}`);
        setPost(null);
        setComments(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim() || !post) return;

    setCommentLoading(true);
    setCommentError(null);

    try {
      // Assuming reviewCRUD.create handles comment creation
      // You might need to adjust the payload based on your 'reviews' table structure
      // Especially linking it to the blog post (e.g., adding a post_id field)
      const commentToAdd = await reviewCRUD.create({
        author: commenterName,
        rating: 0, // Default rating if not applicable for comments, or add a field
        status: "Oczekująca", // Comments likely need approval
        text: newComment,
        // post_id: post.id, // Link comment to the post ID - **IMPORTANT** ensure this field exists in your 'reviews' table
        date: new Date().toISOString(), // Set current date
      });

      // Optimistically add or inform user comment is pending approval
      // setComments(prev => prev ? [commentToAdd, ...prev] : [commentToAdd]); // Don't add directly if pending approval
      alert("Komentarz został wysłany i oczekuje na zatwierdzenie.");
      setNewComment("");
      setCommenterName("");
    } catch (err: any) {
      setCommentError(`Błąd wysyłania komentarza: ${err.message}`);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 px-4"><Loader /></div>;
  }

  if (error) {
     return <div className="text-center py-20 px-4 text-red-600">{error} <Link to="/blog" className="text-[#04515E] hover:underline">Wróć do Bloga</Link></div>;
  }

  if (!post) {
    // This case should ideally be covered by the error state now
    return <div className="text-center py-20 px-4">Nie znaleziono wpisu. <Link to="/blog" className="text-[#04515E] hover:underline">Wróć do Bloga</Link></div>;
  }

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm">
            <span className="flex items-center mr-3 mb-1 sm:mb-0"><Clock className="h-4 w-4 mr-1" /> {formatDate(post.date)}</span>
            <span className="flex items-center mr-3 mb-1 sm:mb-0"><User className="h-4 w-4 mr-1" /> Autor: {post.author}</span>
          </div>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 prose-headings:text-gray-900 prose-a:text-[#04515E] hover:prose-a:text-[#03414b]"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }} // Display content, fallback to excerpt
        />

        {/* Comments Section */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 md:mb-6 flex items-center">
            <MessageSquare className="h-6 w-6 md:h-7 md:w-7 mr-2 md:mr-3 text-[#04515E]" /> Komentarze ({comments?.length || "0"})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 md:mb-10 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
             {commentError && <Feedback type="error" message={commentError} />}
             <div className="mb-4">
              <label htmlFor="commenterName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Twoje Imię</label>
              <input
                type="text" id="commenterName" value={commenterName} onChange={(e) => setCommenterName(e.target.value)}
                placeholder="Wpisz swoje imię" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] transition duration-150 text-sm sm:text-base"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="commentText" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Twój Komentarz</label>
              <textarea
                id="commentText" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)}
                placeholder="Napisz swój komentarz..." required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#04515E] focus:border-[#04515E] transition duration-150 text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2 bg-[#04515E] text-white rounded-md font-semibold hover:bg-[#03414b] transition duration-300 disabled:opacity-50 text-xs sm:text-sm"
              disabled={!newComment.trim() || !commenterName.trim() || commentLoading}
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> {commentLoading ? 'Wysyłanie...' : 'Opublikuj Komentarz'}
            </button>
          </form>

          {/* Display Comments */}
          {comments && comments.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 sm:p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{comment.author}</p>
                    {comment.date&& <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm sm:text-base">Brak zatwierdzonych komentarzy.</p>
          )}
        </div>

        {/* Back to Blog Link */}
        <div className="mt-10 md:mt-12 text-center">
            <Link to="/blog" className="text-[#04515E] hover:text-[#03414b] font-semibold hover:underline text-sm sm:text-base">
                &larr; Wróć do Listy Blogów
            </Link>
        </div>

      </div>
    </div>
  );
}

export default BlogPostPage;
