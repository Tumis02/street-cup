import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

export interface PhotoData {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
  }
  

// Komponenta pro modální okno s fotkou
const PhotoModal: React.FC<{ photos: PhotoData[]; currentIndex: number; onClose: () => void }> = ({ photos, currentIndex, onClose }) => {
    const [index, setIndex] = useState(currentIndex);
  
    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    };
  
    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    };
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev(e as any);
      if (e.key === 'ArrowRight') handleNext(e as any);
      if (e.key === 'Escape') onClose();
    };
  
    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-200"
            aria-label="Zavřít"
          >
            &times;
          </button>
          
         {photos.length > 1 && <> <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-gray-200"
            aria-label="Předchozí"
          >
            ←
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-gray-200"
            aria-label="Další"
          >
            →
          </button></>
  }
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
            {photos[index].alt}
          </div>
        </div>
      </div>
    );
  };

  export default PhotoModal;