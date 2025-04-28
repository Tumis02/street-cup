import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section bg-secondary text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Kontakty</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Máte dotaz ohledně turnaje? Neváhejte nás kontaktovat.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center mr-4">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1 text-xl">E-mail</h4>
                <p className="text-lg">
                  <a href="mailto:info@streetcup2025.cz" className="hover:text-primary transition-colors">
                    info@streetcup2025.cz
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center mr-4">
                <FaPhone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1 text-xl">Telefon</h4>
                <p className="text-lg">
                  <a href="tel:+420123456789" className="hover:text-primary transition-colors">
                    +420 123 456 789
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 