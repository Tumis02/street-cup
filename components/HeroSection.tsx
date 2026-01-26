import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import heroImage from '../public/foto_street_2024.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-start justify-center">
      {/* Obrázek na pozadí */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Basketball tournament"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="w-full h-full"
        />
      </div>
      
      {/* Tmavý gradient přes celý obrázek pro lepší čitelnost textu */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      {/* Textový obsah ve středu obrazovky */}
      <div className="container mx-auto px-4 relative z-10 text-center" style={{marginTop: '5rem'}}>
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8 text-white">
            <span className="block text-5xl md:text-6xl font-graffiti mb-2 text-shadow transform -rotate-2 scale-110 tracking-wider">STREET CUP 2026</span>
          </h1>          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#registration" className="btn btn-primary text-lg px-6 py-3">
              Přihlásit tým
            </Link>
            <Link href="#about" className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary text-lg px-6 py-3">
              Více informací
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 