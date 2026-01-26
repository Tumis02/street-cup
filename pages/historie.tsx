import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import historyData from '../data/history.json';
import Layout from '@/components/Layout';

const HistoryPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Kompletní historie turnaje | Street Cup 2026</title>
        <meta name="description" content="Prohlédněte si kompletní historii basketbalového turnaje Street Cup od jeho začátků až po současnost." />
      </Head>

      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Kompletní historie turnaje</h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg">Od skromných začátků až po mezinárodní turnaj</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertikální čára časové osy */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-light"></div>
          
          {/* Historie události */}
          <div className="space-y-12">
            {historyData.sort((a, b) => parseInt(b.year) - parseInt(a.year)).map((event, index) => (
              <div 
                key={event.year} 
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Datum */}
                <div className="md:w-1/2 flex items-center md:pr-8 md:pl-8">
                  <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} w-full`}>
                    <Link href={`/rocnik/${event.year}`}>
                      <div className="p-3 bg-primary text-white font-bold rounded-lg shadow-md z-10 hover:bg-primary-dark transition-colors cursor-pointer">
                        {event.year}
                      </div>
                    </Link>
                  </div>
                </div>
                
                {/* Bod na časové ose */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white z-10"></div>
                
                {/* Obsah - fotografie */}
                <div className="md:w-1/2 md:pl-8 md:pr-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
                   {event.photo && <Image 
                      src={`/${event.year}/${event.photo}`}
                      width={400}
                      height={200}
                      alt={`Fotografie z ročníku ${event.year}`}
                      className="rounded-md mb-4"
                      style={{objectFit: 'cover', width: '100%', height: '200px', maxWidth: 400}}
                    />}
                    <div className="text-center">
                      <Link href={`/rocnik/${event.year}`} className="hover:text-primary">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      </Link>
                      {/* <p className="text-gray-600 text-sm">{event.description}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="btn btn-primary text-lg px-6 py-3">
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage; 