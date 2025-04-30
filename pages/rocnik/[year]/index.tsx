import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import historyData from '../../../data/history.json';
import heroImage from '../../../public/foto_street_2024.jpg';
import PhotoModal from '@/components/PhotoModal';
import { PhotoData } from '@/components/PhotoModal';

// Definice typu pro data ročníku
interface YearData {
  year: string;
  title: string;
  description: string;
  slug: string;
  awards: {
    winner: string;
    category: string;
  }[];
  results: {
    teamName: string;
    position: number;
  }[];
}


interface YearPageProps {
  yearData: YearData;
  prevYear: YearData | null;
  nextYear: YearData | null;
  gallery: PhotoData[];
}


// Tento komponent zobrazuje detaily ročníku
const YearPage: React.FC<YearPageProps> = ({ yearData, prevYear, nextYear, gallery }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Ročník {yearData.year} | Street Cup </title>
        <meta name="description" content={yearData.description} />
      </Head>

      {/* Lightbox modal pro galerii */}
      {selectedPhotoIndex !== null && (
        <PhotoModal
          photos={gallery}
          currentIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
      {lightboxOpen && (
        <PhotoModal
          photos={[{src: heroImage, alt: 'Fotografie z ročníku 2024', width: 1200, height: 800} as PhotoData]}
          currentIndex={0}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <div className="text-4xl text-primary font-bold mb-4">Ročník {yearData.year}</div>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-8">{yearData.description}</p>
          </div>
        </div>

        {/* Nový layout sekce */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Pravý sloupec: velká fotka - na mobilech první, na xl druhý */}
          <div className="order-1 xl:order-2 xl:col-span-2 flex items-center justify-center">
            <Image
              src={heroImage}
              alt={`Společné foto ročník ${yearData.year}`}
              className="rounded-md cursor-pointer shadow-md"
              style={{objectFit: 'cover', width: '100%', maxWidth: '1000px', aspectRatio: '16/9'}}
              onClick={() => setLightboxOpen(true)}
            />
          </div>
          {/* Levý sloupec: karta - na mobilech druhá, na xl první */}
          <div className="order-2 xl:order-1 bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-xl font-bold mb-3">Nejlepší hráči a soutěže</h3>
            {yearData.awards && yearData.awards.map((award, index) => (
              <p key={index} className="mb-2"><strong>{award.category}:</strong> {award.winner}</p>
            ))}
           
            <h3 className="text-xl font-bold mb-3 mt-4">Celkové pořadí týmů</h3>
            {(() => {
              const teams = yearData.results.sort((a, b) => a.position - b.position).map(result => result.teamName);
              const col1 = teams.slice(0, Math.ceil(teams.length/2));
              const col2 = teams.slice(Math.ceil(teams.length/2));
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1" start={1}>
                    {col1.map((team, idx) => (
                      <li key={idx}>
                        <span className={idx < 3 ? 'font-bold text-primary' : ''}>{team} {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''}</span>
                      </li>
                    ))}
                  </ol>
                  <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1" start={col1.length+1}>
                    {col2.map((team, idx) => (
                      <li key={idx+col1.length}>{team}</li>
                    ))}
                  </ol>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Fotogalerie */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Fotogalerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  fill
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigace mezi ročníky */}
        <div className="mt-16 flex justify-between">
          {prevYear ? (
            <Link href={`/rocnik/${prevYear.year}`} className="btn btn-outline">
              ← Ročník {prevYear.year}
            </Link>
          ) : (
            <div></div>
          )}
          
          <Link href="/historie" className="btn btn-primary">
            Zpět na historii
          </Link>
          
          {nextYear ? (
            <Link href={`/rocnik/${nextYear.year}`} className="btn btn-outline">
              Ročník {nextYear.year} →
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Tato funkce definuje všechny možné cesty
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = historyData.map((year) => ({
    params: { year: year.year },
  }));

  return {
    paths,
    fallback: false,
  };
};

// Tato funkce načítá data konkrétního ročníku
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  
  // Seřazení dat podle roku vzestupně
  const sortedYears = [...historyData].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Najdeme index aktuálního ročníku
  const currentIndex = sortedYears.findIndex(y => y.year === year);
  
  if (currentIndex === -1) {
    return { notFound: true };
  }
  
  // Získáme data pro aktuální, předchozí a následující ročník
  const yearData = sortedYears[currentIndex];
  const prevYear = currentIndex > 0 ? sortedYears[currentIndex - 1] : null;
  const nextYear = currentIndex < sortedYears.length - 1 ? sortedYears[currentIndex + 1] : null;
  
  // Dynamicky načteme galerii podle roku
  const galleryData = require(`../../../data/gallery-${year}.json`);
  
  return {
    props: {
      yearData,
      prevYear,
      nextYear,
      gallery: galleryData
    },
  };
};

export default YearPage; 