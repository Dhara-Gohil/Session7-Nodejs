import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavigationHeader = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Contact Us</h2>
          <button onClick={() => setShowContactModal(false)} className="text-neutral-500 hover:text-neutral-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Get in Touch</h3>
            <p className="text-neutral-600 mb-4">We'd love to hear from you! Reach out through any of these channels:</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-neutral-700">contact@myblog.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-neutral-700">+91 999999999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowHelpModal(false)}>
      <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Help & FAQ</h2>
          <button onClick={() => setShowHelpModal(false)} className="text-neutral-500 hover:text-neutral-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">How to navigate the blog?</h3>
            <p className="text-neutral-600 text-sm">Use the search bar to find specific topics, or browse by categories. Click on any article title to read the full post.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">How to subscribe for updates?</h3>
            <p className="text-neutral-600 text-sm">Scroll down to the bottom of the homepage and enter your email in the subscription form to get notified of new posts.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">How to share articles?</h3>
            <p className="text-neutral-600 text-sm">On any blog post, use the Share button to copy the link or share directly through your device's sharing options.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Admin access?</h3>
            <p className="text-neutral-600 text-sm">Click the Admin link in the navigation to access the admin panel for managing blog posts and categories.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Need more help?</h3>
            <p className="text-neutral-600 text-sm">Contact us through the Contact link for personalized assistance with any questions or issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <header className="bg-white/85 backdrop-blur-md shadow-sm border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-warm hover:scale-105 transition-transform duration-300">
                MyBlog
              </Link>
            </div>
            <nav className="flex space-x-1">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                Home
              </Link>
              <button
                onClick={handleHelpClick}
                className="text-neutral-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                Help
              </button>
              <button
                onClick={handleContactClick}
                className="text-neutral-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                Contact
              </button>
              <Link 
                to="/admin" 
                className="text-neutral-700 hover:text-secondary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary-50 transition-all duration-300"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {showContactModal && <ContactModal />}
      {showHelpModal && <HelpModal />}
    </>
  );
};

export default NavigationHeader;