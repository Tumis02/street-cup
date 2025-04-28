import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sponsorsData from '../data/sponsors.json';

const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="section bg-white py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Naši sponzoři</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Děkujeme všem partnerům za podporu při organizaci turnaje Street Cup 2025
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {sponsorsData.map((sponsor) => (
            <div key={sponsor.id} className="flex flex-col items-center">
              <Link href={sponsor.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <div className="relative w-40 h-40 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  {/* Pro ukázku používáme alternativní zobrazení, dokud nebudou k dispozici skutečná loga */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-300 text-8xl font-bold">{sponsor.name.charAt(0)}</div>
                  </div>
                  
                  {/* Zde bude skutečné logo, až bude dostupné */}
                  {/* <Image 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`} 
                    fill
                    style={{ objectFit: 'contain' }}
                  /> */}
                </div>
              </Link>
              <span className="mt-2 text-center text-secondary font-medium">{sponsor.name}</span>
            </div>
          ))}
        </div>
        
      {/*   <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Máte zájem stát se sponzorem turnaje?</p>
          <Link 
            href="#contact" 
            className="btn btn-outline btn-primary"
          >
            Kontaktujte nás
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default SponsorsSection; 