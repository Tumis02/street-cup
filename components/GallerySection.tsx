import React, { useState, useMemo } from 'react';
import Image from 'next/image';

// Definice typu pro data ročníku
interface YearData {
  year: string;
  title: string;
  description: string;
  slug: string;
  photo?: string;
  awards: {
    winner: string;
    category: string;
    photo?: string;
  }[];
  results: {
    teamName: string;
    position: number;
    players?: string[];
    photo?: string;
  }[];
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description: string;
}

interface GallerySectionProps {
  yearData: YearData;
}

const GallerySection: React.FC<GallerySectionProps> = ({ yearData }) => {
  // Sestavení seznamu všech fotek z history.json pro daný ročník
  const images = useMemo(() => {
    const imageList: GalleryImage[] = [];
    let id = 1;

    // Přidání hlavní fotky ročníku
    if (yearData.photo) {
      imageList.push({
        id: id++,
        src: `/${yearData.year}/${yearData.photo}`,
        alt: `Společná fotka ročník ${yearData.year}`,
        description: `Ročník ${yearData.year}`,
      });
    }

    // Přidání fotek ocenění
    yearData.awards.forEach((award) => {
      if (award.photo) {
        imageList.push({
          id: id++,
          src: `/${yearData.year}/${award.photo}`,
          alt: `${award.winner} - ${award.category}`,
          description: `${award.category}: ${award.winner}`,
        });
      }
    });

    // Přidání fotek týmů
    yearData.results.forEach((result) => {
      if (result.photo) {
        imageList.push({
          id: id++,
          src: `/${yearData.year}/${result.photo}`,
          alt: `${result.teamName} - ${result.position}. místo`,
          description: `${result.position}. místo: ${result.teamName}`,
        });
      }
    });

    return imageList;
  }, [yearData]);

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

  // Pokud nejsou žádné fotky, nezobrazujeme sekci
  if (images.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Fotogalerie</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg">Prohlédněte si nejlepší momenty z ročníku {yearData.year}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square bg-gray-200"
              onClick={() => openLightbox(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-medium text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {activeImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Zavřít"
            >
              &times;
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                getPrevImage();
              }}
              aria-label="Předchozí fotka"
            >
              &#8249;
            </button>

            <div
              className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {images.find(img => img.id === activeImage) && (
                <>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={images.find(img => img.id === activeImage)!.src}
                      alt={images.find(img => img.id === activeImage)!.alt}
                      width={1200}
                      height={800}
                      style={{ objectFit: 'contain', maxHeight: '85vh', width: 'auto', height: 'auto' }}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white rounded-b-lg">
                    <p className="text-center">{images.find(img => img.id === activeImage)?.description}</p>
                  </div>
                </>
              )}
            </div>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                getNextImage();
              }}
              aria-label="Další fotka"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection; 