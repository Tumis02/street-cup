import React, { useState } from 'react';

const GallerySection: React.FC = () => {
  // V reálné aplikaci byste zde měli dynamicky načítat obrázky
  // Pro ukázku používáme placeholder data
  const images = [
    { id: 1, src: '/images/gallery-1.jpg', alt: 'Street basketbal 1', description: 'Finálový zápas 2024' },
    { id: 2, src: '/images/gallery-2.jpg', alt: 'Street basketbal 2', description: 'Soutěž ve smečování' },
    { id: 3, src: '/images/gallery-3.jpg', alt: 'Street basketbal 3', description: 'Týmová fotografie vítězů' },
    { id: 4, src: '/images/gallery-4.jpg', alt: 'Street basketbal 4', description: 'Atmosféra turnaje' },
    { id: 5, src: '/images/gallery-5.jpg', alt: 'Street basketbal 5', description: 'Soutěž ve střelbě trojek' },
    { id: 6, src: '/images/gallery-6.jpg', alt: 'Street basketbal 6', description: 'Doprovodný program' },
    { id: 7, src: '/images/gallery-7.jpg', alt: 'Street basketbal 7', description: 'Diváci na turnaji' },
    { id: 8, src: '/images/gallery-8.jpg', alt: 'Street basketbal 8', description: 'Napínavý moment ze zápasu' },
  ];

  const [activeImage, setActiveImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
    setActiveImage(id);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const getNextImage = () => {
    if (activeImage === null) return;
    const currentIndex = images.findIndex(img => img.id === activeImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIndex].id);
  };

  const getPrevImage = () => {
    if (activeImage === null) return;
    const currentIndex = images.findIndex(img => img.id === activeImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[prevIndex].id);
  };

  return (
    <section id="gallery" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Fotogalerie</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg">Prohlédněte si nejlepší momenty z minulých ročníků</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square bg-gray-200"
              onClick={() => openLightbox(image.id)}
            >
              {/* Zde by byl v reálné aplikaci skutečný obrázek */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">
                  {image.alt}
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-medium">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tlačítko pro zobrazení více fotografií */}
        <div className="text-center mt-8">
          <button className="btn btn-outline">
            Zobrazit více fotografií
          </button>
        </div>
        
        {/* Lightbox */}
        {activeImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={getPrevImage}
            >
              &lt;
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh] flex items-center justify-center">
              {/* Zde by byl v reálné aplikaci skutečný obrázek */}
              <div className="bg-gray-800 w-full h-64 md:h-96 flex items-center justify-center">
                {images.find(img => img.id === activeImage)?.alt}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <p>{images.find(img => img.id === activeImage)?.description}</p>
              </div>
            </div>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={getNextImage}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection; 