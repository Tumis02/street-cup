import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'O turnaji', href: '#about' },
    { name: 'Pravidla', href: '#rules' },
    { name: 'Historie', href: '#history' },
    { name: 'Fotogalerie', href: '#gallery' },
    { name: 'Přihláška', href: '#registration' },
    { name: 'Kontakty', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        <Link href="/">
          <span className="text-2xl font-bold text-primary cursor-pointer">STREET CUP <span className="text-secondary">2025</span></span>
        </Link>

        {/* Mobilní menu ikona */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-secondary hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktopová navigace */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-secondary hover:text-primary font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobilní menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-secondary hover:text-primary font-medium transition-colors"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 