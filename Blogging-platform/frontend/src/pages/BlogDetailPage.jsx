import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import NavigationHeader from '../components/Layout/NavigationHeader';
import ImageWithFallback from '../components/common/ImageWithFallback';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogBySlug(slug);
      setBlog(response.data);
    } catch (error) {
      setError('Blog not found');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this blog post';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        setShareStatus('Thanks for sharing!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
    
    // Clear status after 3 seconds
    setTimeout(() => setShareStatus(''), 3000);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShareStatus('Link copied to clipboard!');
    } catch (error) {
      setShareStatus('Unable to copy link');
    }
  };

  if (loading) {
    return (
      <div>
        <NavigationHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <div className="text-lg text-neutral-600">Loading great content...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <NavigationHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center animate-soft-fade">
            <div className="text-center mb-4">
              <svg className="w-16 h-16 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-warm mb-4 font-display">Oops! Blog Not Found</h1>
            <p className="text-neutral-600 mb-8">The blog you're looking for seems to have wandered off.</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium hover:-translate-x-1 transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <article className="card-natural overflow-hidden animate-soft-fade">
          <div className="relative">
            <ImageWithFallback
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-6">
              <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200">
                {blog.category?.name || 'Uncategorized'}
              </span>
              <span className="text-neutral-500 ml-auto flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
                {formatDate(blog.publishDate)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight font-display">
              {blog.title}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-8"></div>
            
            <div 
              className="prose prose-lg prose-primary max-w-none leading-relaxed"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: '#374151'
              }}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            
            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Enjoyed this article?</h3>
                  <p className="text-neutral-600">Share it with your friends!</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={handleShare}
                    className="btn-secondary text-sm flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  <button 
                    onClick={handleLike}
                    className={`btn-secondary text-sm flex items-center space-x-2 transition-colors ${
                      liked ? 'bg-red-100 text-red-700 border-red-200' : ''
                    }`}
                  >
                    <svg className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{liked ? 'Liked!' : 'Like'}</span>
                  </button>
                </div>
              </div>
              
              {shareStatus && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded-lg text-sm">
                  {shareStatus}
                </div>
              )}
            </div>
          </div>
        </article>
        
        {/* Back to Home CTA */}
        <div className="text-center mt-12">
          <Link to="/" className="btn-primary">
            Explore More Articles
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;