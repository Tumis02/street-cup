import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import historyData from '../../data/history.json';
import galleryData from '../../data/gallery-2024.json';

// Definice typu pro data ročníku
interface YearData {
  year: string;
  title: string;
  description: string;
  slug: string;
}

interface PhotoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface YearPageProps {
  yearData: YearData;
  prevYear: YearData | null;
  nextYear: YearData | null;
  gallery: PhotoData[];
}

// Komponenta pro modální okno s fotkou
const PhotoModal: React.FC<{ photo: PhotoData; onClose: () => void }> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          &times;
        </button>
        <div className="relative w-full h-auto">
          {/* Poznámka: Ve skutečném projektu by zde byla Image komponenta s reálným obrázkem */}
          <div className="bg-gray-200 w-full h-[60vh] flex items-center justify-center">
            <p className="text-gray-600">{photo.alt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tento komponent zobrazuje detaily ročníku 2024
const Year2024Page: React.FC<YearPageProps> = ({ yearData, prevYear, nextYear, gallery }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);

  return (
    <Layout>
      <Head>
        <title>Ročník {yearData.year} | Street Cup </title>
        <meta name="description" content={yearData.description} />
      </Head>

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}

      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <div className="text-4xl text-primary font-bold mb-4">Ročník {yearData.year}</div>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-8">{yearData.description}</p>
          </div>
        </div>

        {/* Statistiky a zajímavosti z ročníku 2024 */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Zajímavosti a statistiky</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Karta Celkové pořadí týmů */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Celkové pořadí týmů</h3>
              {(() => {
                const teams = [
                  '🥇 Dunkers (Slovensko)',
                  '🥈 Street Kings (Česko)',
                  '🥉 Ballers (Česko)',
                  'Street Queens (Česko)',
                  'FunBallers (Polsko)',
                  'Praha Stars (Česko)',
                  'Brno Bulls (Česko)',
                  'Ostrava Eagles (Česko)',
                  'Košice Crew (Slovensko)',
                  'Wroclaw Hoops (Polsko)'
                  // ...další týmy dle potřeby...
                ];
                const half = Math.ceil(teams.length / 2);
                const col1 = teams.slice(0, 6);
                const col2 = teams.slice(6);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1" start={1}>
                      {col1.map((team, idx) => (
                        <li key={idx}>
                          <span className={idx < 3 ? 'font-bold text-primary' : ''}>{team}</span>
                        </li>
                      ))}
                    </ol>
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1" start={7}>
                      {col2.map((team, idx) => (
                        <li key={idx+6}>{team}</li>
                      ))}
                    </ol>
                  </div>
                );
              })()}
            </div>
            
            {/* Karta Nejlepší hráči */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Nejlepší hráči a soutěže</h3>
              <p className="mb-2"><strong>MVP muž:</strong> Jan Novák (Dunkers)</p>
              <p className="mb-2"><strong>MVP žena:</strong> Petra Svobodová (Street Queens)</p>
              <p className="mb-2"><strong>Vítěz shoot-out:</strong> Tomáš Dvořák (Street Kings)</p>
              <p className="mb-2"><strong>Vítěz trestných hodů:</strong> Martin Polák (Ballers)</p>
              <p><strong>Vítěz doplňkových soutěží:</strong> Tým FunBallers</p>
            </div>
          </div>
        </div>

        {/* Fotogalerie */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Fotogalerie</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {gallery.map((photo, index) => (
              <div 
                key={index} 
                className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Ve skutečném projektu by zde byla Image komponenta s reálným obrázkem */}
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <p className="text-gray-600 p-4 text-center">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigace mezi ročníky */}
        <div className="mt-16 flex justify-between">
          {prevYear ? (
            <Link href={`/rocnik/${prevYear.slug}`} className="btn btn-outline">
              ← Ročník {prevYear.year}
            </Link>
          ) : (
            <div></div>
          )}
          
          <Link href="/historie" className="btn btn-primary">
            Zpět na historii
          </Link>
          
          {nextYear ? (
            <Link href={`/rocnik/${nextYear.slug}`} className="btn btn-outline">
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

// Tato funkce načítá data konkrétního ročníku
export const getStaticProps: GetStaticProps = async () => {
  // Seřazení dat podle roku vzestupně
  const sortedYears = [...historyData].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Najdeme index aktuálního ročníku (2024)
  const currentIndex = sortedYears.findIndex(year => year.year === "2024");
  
  if (currentIndex === -1) {
    return { notFound: true };
  }
  
  // Získáme data pro aktuální, předchozí a následující ročník
  const yearData = sortedYears[currentIndex];
  const prevYear = currentIndex > 0 ? sortedYears[currentIndex - 1] : null;
  const nextYear = currentIndex < sortedYears.length - 1 ? sortedYears[currentIndex + 1] : null;
  
  return {
    props: {
      yearData,
      prevYear,
      nextYear,
      gallery: galleryData
    },
  };
};

export default Year2024Page; 