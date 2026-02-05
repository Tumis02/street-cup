import React from 'react';
import Link from 'next/link';
import historyData from '../data/history.json';
import Image from 'next/image';

const HistorySection: React.FC = () => {
  // Zobrazení pouze 5 nejnovějších záznamů (seřazených podle roku sestupně)
  const recentHistory = [...historyData]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, 4);

  return (
    <section id="history" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Historie turnaje</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertikální čára časové osy */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-light"></div>
          
          {/* Historie události */}
          <div className="space-y-12">
            {recentHistory.map((event, index) => (
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
                
                {/* Obsah */}
                <div className="md:w-1/2 md:pl-8 md:pr-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
                    {event.photo && (
                      <Image
                        src={`/${event.year}/${event.photo}`}
                        alt={`Fotografie z ročníku ${event.year}`}
                        width={400}
                        height={200}
                        className="rounded-md mb-4"
                        style={{objectFit: 'cover', width: '100%', height: '200px', maxWidth: 400}}
                      />
                    )}
                    <div className="text-center">
                      <Link href={`/rocnik/${event.year}`} className="hover:text-primary">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tlačítko pro zobrazení kompletní historie */}
        <div className="text-center mt-16">
          <Link href="/historie" className="btn btn-primary text-lg px-6 py-3">
            Zobrazit kompletní historii
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HistorySection; 