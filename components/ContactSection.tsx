import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section bg-secondary text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Kontakty</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Kontaktní informace</h3>
            
            <div className="space-y-4 max-w-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Adresa organizátora</h4>
                  <p>Basketbalová 123, 110 00 Praha 1, Česká republika</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">E-mail</h4>
                  <p>
                    <a href="mailto:info@streetcup2025.cz" className="hover:text-primary transition-colors">
                      info@streetcup2025.cz
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-4">
                  <FaPhone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Telefon</h4>
                  <p>
                    <a href="tel:+420123456789" className="hover:text-primary transition-colors">
                      +420 123 456 789
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Sledujte nás</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Kontaktní formulář</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Vaše jméno
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 bg-secondary-light border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  placeholder="Jan Novák"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 bg-secondary-light border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  placeholder="jan.novak@email.cz"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 font-medium">
                  Předmět
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 bg-secondary-light border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  placeholder="Dotaz k turnaji"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  Zpráva
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-secondary-light border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  placeholder="Vaše zpráva..."
                ></textarea>
              </div>
              
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  Odeslat zprávu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 