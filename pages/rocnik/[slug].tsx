import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import historyData from '../../data/history.json';

// Definice typu pro data ročníku
interface YearData {
  year: string;
  title: string;
  description: string;
  slug: string;
  // Toto pole bude později obsahovat odkazy na fotky
  gallery?: string[];
}

interface YearPageProps {
  yearData: YearData;
  prevYear: YearData | null;
  nextYear: YearData | null;
}

// Tento komponent zobrazuje detaily ročníku
const YearPage: React.FC<YearPageProps> = ({ yearData, prevYear, nextYear }) => {
  if (!yearData) return <div>Ročník nenalezen</div>;

  return (
    <Layout>
      <Head>
        <title>{yearData.title} | Street Cup {yearData.year}</title>
        <meta name="description" content={yearData.description} />
      </Head>

      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{yearData.title}</h1>
          <div className="text-xl text-primary font-bold mb-4">Ročník {yearData.year}</div>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-8">{yearData.description}</p>
          </div>
        </div>

        {/* Místo pro další informace, statistiky atd. */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Zajímavosti a statistiky</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-center text-gray-500">
              Tato sekce bude doplněna. Pro každý ročník je možné přidat specifické statistiky, seznam vítězů, 
              výsledky jednotlivých zápasů a další informace.
            </p>
          </div>
        </div>

        {/* Místo pro fotogalerii */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Fotogalerie</h2>
          
          {yearData.gallery && yearData.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yearData.gallery.map((photo, index) => (
                <div key={index} className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
                  {/* Zde budou fotky, až budou dostupné */}
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Fotografie {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Pro tento ročník zatím nejsou k dispozici žádné fotografie.</p>
            </div>
          )}
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

// Tato funkce generuje statické cesty pro všechny ročníky
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = historyData.map((year) => ({
    params: { slug: year.slug },
  }));

  return { paths, fallback: false };
};

// Tato funkce načítá data konkrétního ročníku
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Seřazení dat podle roku vzestupně
  const sortedYears = [...historyData].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Najdeme index aktuálního ročníku
  const currentIndex = sortedYears.findIndex(year => year.slug === slug);
  
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
    },
  };
};

export default YearPage; 