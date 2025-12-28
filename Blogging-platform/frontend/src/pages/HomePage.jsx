import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import NavigationHeader from '../components/Layout/NavigationHeader';
import ImageWithFallback from '../components/common/ImageWithFallback';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchBlogs();
      return;
    }

    try {
      const response = await blogAPI.searchBlogs(searchQuery);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) {
      setSubscribeStatus('Please enter a valid email address');
      return;
    }

    setSubscribeStatus('Subscribing...');
    
    // Simulate subscription process
    setTimeout(() => {
      setSubscribeStatus('Thank you for subscribing! You\'ll receive updates soon.');
      setSubscribeEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus('');
      }, 5000);
    }, 1000);
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

  return (
    <div>
      <NavigationHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-soft-fade">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-display">
              <span className="text-warm">Welcome to</span>
              <br />
              <span className="text-neutral-800">My Personal Blog</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover thoughtful articles, personal insights, and stories that inspire. 
            Join me on this journey of learning and sharing experiences.
          </p>
          
          {/* Enhanced Search */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for interesting content..."
                className="input-natural pl-12 pr-32 py-4 text-lg rounded-full shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 btn-primary py-2 px-6 rounded-full text-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-center mb-4">
                <svg className="w-16 h-16 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-neutral-500 text-xl">No blogs found. Check back soon for new content!</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <article 
                key={blog._id} 
                className="card-natural overflow-hidden animate-subtle-slide group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={blog.thumbnailImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full border border-primary-200">
                      {blog.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-neutral-500 text-sm ml-auto flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(blog.publishDate)}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 font-display">
                    <Link 
                      to={`/${blog.slug}`}
                      className="hover:text-primary-600 transition-colors duration-200 group-hover:text-primary-600"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                  </p>
                  
                  <Link
                    to={`/${blog.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    Read More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
        
        {/* Call to Action */}
        {blogs.length > 0 && (
          <div className="text-center mt-16 animate-soft-fade">
            <div className="card-natural inline-block p-8 max-w-md">
              <h3 className="text-2xl font-bold text-warm mb-4 font-display">Enjoying the content?</h3>
              <p className="text-neutral-600 mb-6">Stay updated with new posts and insights!</p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input-natural w-full px-4 py-3 rounded-lg"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={subscribeStatus === 'Subscribing...'}
                >
                  {subscribeStatus === 'Subscribing...' ? 'Subscribing...' : 'Subscribe for Updates'}
                </button>
              </form>
              
              {subscribeStatus && subscribeStatus !== 'Subscribing...' && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  subscribeStatus.includes('Thank you') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {subscribeStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;