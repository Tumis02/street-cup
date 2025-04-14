import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-light text-white py-10">
      <div className="container mx-auto px-4">
        {/* <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Street Cup 2025</h3>
            <p className="mb-4">Největší streetballový turnaj v České republice. Připojte se k nám a staňte se součástí jedinečné basketbalové akce.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-primary transition-colors">
                  O turnaji
                </Link>
              </li>
              <li>
                <Link href="#rules" className="hover:text-primary transition-colors">
                  Pravidla
                </Link>
              </li>
              <li>
                <Link href="#history" className="hover:text-primary transition-colors">
                  Historie
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-primary transition-colors">
                  Fotogalerie
                </Link>
              </li>
              <li>
                <Link href="#registration" className="hover:text-primary transition-colors">
                  Přihláška
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-primary transition-colors">
                  Kontakty
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Přihlaste se k odběru novinek a buďte první, kdo se dozví o aktualizacích turnaje.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Váš e-mail"
                className="px-3 py-2 bg-secondary border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-white flex-grow"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors">
                Odebírat
              </button>
            </form>
          </div>
        </div> */}
        
        <div className="mt-8 pt-8 text-center md:flex md:justify-end md:items-center">
          <p>&copy; {new Date().getFullYear()} Street Cup. Všechna práva vyhrazena.</p>
         {/*  <div className="mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors mx-2">
              Ochrana osobních údajů
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors mx-2">
              Podmínky použití
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 