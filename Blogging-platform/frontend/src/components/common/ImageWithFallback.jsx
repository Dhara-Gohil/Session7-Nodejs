import { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  showPlaceholder = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Create a beautiful gradient placeholder
  const createGradientPlaceholder = (text) => {
    const gradients = [
      'from-primary-400 to-secondary-500',
      'from-secondary-400 to-accent-500',
      'from-accent-400 to-primary-500',
      'from-neutral-400 to-primary-500',
      'from-secondary-400 to-neutral-500'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    return (
      <div className={`bg-gradient-to-br ${randomGradient} flex items-center justify-center ${className}`}>
        <div className="text-center text-white p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="text-sm font-medium opacity-90">{text || alt || 'Image'}</div>
        </div>
      </div>
    );
  };

  if (imageError && !fallbackSrc && !showPlaceholder) {
    return null;
  }

  if (imageError && !fallbackSrc && showPlaceholder) {
    return createGradientPlaceholder(alt);
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse flex items-center justify-center ${className}`}>
          <div className="text-center text-neutral-500">
            <svg className="w-6 h-6 mx-auto mb-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div className="text-sm">Loading...</div>
          </div>
        </div>
      )}
      
      <img
        src={imageError ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageWithFallback;