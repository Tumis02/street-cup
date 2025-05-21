import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'O turnaji', href: '/#about', id: 'about' },
    { name: 'Pravidla', href: '/#rules', id: 'rules' },
    { name: 'Historie', href: '/#history', id: 'history' },
    { name: 'Fotogalerie', href: '/#gallery', id: 'gallery' },
    { name: 'Přihláška', href: '/#registration', id: 'registration' },
    { name: 'Kontakty', href: '/#contact', id: 'contact' },
  ];

  // Funkce pro zjištění viditelné sekce při scrollování
  useEffect(() => {
    const handleScroll = () => {
      // Kontrola, zda jsme na úvodní stránce
      if (router.pathname !== '/') {
        setActiveSection('');
        return;
      }

      // Získáme všechny sekce
      const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Získáme aktuální pozici scrollu
      const scrollPosition = window.scrollY + 100; // Přidáme offset pro lepší detekci
      
      // Najdeme aktuální sekci
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // Přidáme event listener pro scrollování
    window.addEventListener('scroll', handleScroll);
    
    // Zavoláme funkci při načtení stránky
    handleScroll();
    
    // Odstraníme event listener při unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router.pathname]);

  // Funkce pro určení, zda je položka menu aktivní
  const isActive = (id: string) => router.pathname === '/' && id === activeSection;

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
              className={`font-medium transition-colors ${
                isActive(item.id) ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
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
                className={`font-medium transition-colors ${
                  isActive(item.id) ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
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