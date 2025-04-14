import React, { useState } from 'react';
import { sendRegistrationEmail, formatRegistrationEmail } from '../lib/EmailService';

interface FormData {
  teamName: string;
  email: string;
  phone: string;
  contactName: string;
  players: {
    name: string;
    birthYear: string;
  }[];
  agreement: boolean;
}

const RegistrationSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    email: '',
    phone: '',
    contactName: '',
    players: [
      { name: '', birthYear: '' },
      { name: '', birthYear: '' },
      { name: '', birthYear: '' },
      { name: '', birthYear: '' }
    ],
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlayerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedPlayers = [...formData.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
    
    setFormData(prev => ({
      ...prev,
      players: updatedPlayers
    }));
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreement: e.target.checked
    }));
  };

  // Funkce pro vytvoření těla e-mailu
  const createEmailBody = (data: FormData): string => {
    const playersInfo = data.players
      .filter(player => player.name.trim() !== '')
      .map((player, index) => `
        <tr>
          <td><strong>Hráč ${index + 1}:</strong></td>
          <td>${player.name}${player.birthYear ? `, ${player.birthYear}` : ''}</td>
        </tr>
      `)
      .join('');

    return `
      <h2>Nová registrace týmu do turnaje Street Cup 2025</h2>
      
      <h3>Informace o týmu</h3>
      <table>
        <tr>
          <td><strong>Název týmu:</strong></td>
          <td>${data.teamName}</td>
        </tr>
        <tr>
          <td><strong>E-mail:</strong></td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td><strong>Telefon:</strong></td>
          <td>${data.phone || 'Neuvedeno'}</td>
        </tr>
      </table>
      
      <h3>Seznam hráčů</h3>
      <table>
        ${playersInfo}
      </table>
      
      <p>Souhlas s podmínkami: Ano</p>
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Validace formuláře
      if (!formData.teamName || !formData.email || !formData.agreement) {
        throw new Error('Vyplňte prosím všechny povinné údaje');
      }

      // Kontrola, zda jsou vyplněni alespoň 3 hráči
      const validPlayers = formData.players.filter(player => player.name.trim() !== '');
      if (validPlayers.length < 3) {
        throw new Error('Tým musí mít alespoň 3 hráče');
      }

      // Vytvoříme data pro potvrzovací e-mail
      const teamInfo = {
        name: formData.teamName,
        contact: {
          email: formData.email,
          phone: formData.phone || 'Neuvedeno',
          name: formData.contactName || formData.teamName,
        },
        players: formData.players
          .filter(player => player.name.trim() !== '')
          .map(player => ({
            name: player.name,
            birthYear: player.birthYear ? parseInt(player.birthYear, 10) : 0,
          })),
      };

      // Vytvoření obsahu e-mailů
      const adminEmailSubject = `Nová registrace týmu: ${formData.teamName}`;
      const adminEmailBody = createEmailBody(formData);
      
      const teamEmailSubject = 'Potvrzení registrace do turnaje Street Cup 2025';
      const teamEmailBody = formatRegistrationEmail(teamInfo);
      
      // Odeslání e-mailů pomocí EmailJS
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@streetcup2025.cz';
      
      // Odešleme email administrátorovi
      await sendRegistrationEmail(
        adminEmail,
        '',
        adminEmailSubject,
        adminEmailBody,
        teamInfo.name,
        teamInfo.players
      );
      
      // Odešleme potvrzovací email týmu
      await sendRegistrationEmail(
        formData.email,
        '',
        teamEmailSubject,
        teamEmailBody,
        teamInfo.name,
        teamInfo.players
      );

      setSubmitSuccess(true);
      
      // Reset formuláře
      setFormData({
        teamName: '',
        email: '',
        phone: '',
        contactName: '',
        players: [
          { name: '', birthYear: '' },
          { name: '', birthYear: '' },
          { name: '', birthYear: '' },
          { name: '', birthYear: '' }
        ],
        agreement: false
      });
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Došlo k neočekávané chybě');
      }
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="section bg-primary bg-opacity-5">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Přihláška do turnaje</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg">Zaregistrujte svůj tým do Street Cup 2025</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Přihláška byla úspěšně odeslána!</h3>
              <p>Děkujeme za váš zájem o účast v turnaji Street Cup 2025. Na zadaný e-mail jsme vám poslali potvrzení a další informace.</p>
              <button 
                className="btn btn-primary mt-4"
                onClick={() => setSubmitSuccess(false)}
              >
                Zaregistrovat další tým
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                  {submitError}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Informace o týmu</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="teamName" className="block mb-1 font-medium">
                        Název týmu *
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactName" className="block mb-1 font-medium">
                        Kontaktní osoba
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-1 font-medium">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Seznam hráčů</h3>
                  <p className="text-sm text-gray-600 mb-4">Vyplňte alespoň 3 hráče.</p>
                  
                  <div className="space-y-4">
                    {formData.players.map((player, index) => (
                      <div key={index} className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md">
                        <div>
                          <label htmlFor={`playerName${index}`} className="block mb-1 font-medium">
                            Jméno hráče {index + 1} {index < 3 ? '*' : ''}
                          </label>
                          <input
                            type="text"
                            id={`playerName${index}`}
                            name="name"
                            value={player.name}
                            onChange={(e) => handlePlayerChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required={index < 3}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`playerBirthYear${index}`} className="block mb-1 font-medium">
                            Věk
                          </label>
                          <input
                            type="number"
                            id={`playerBirthYear${index}`}
                            name="birthYear"
                            value={player.birthYear}
                            onChange={(e) => handlePlayerChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            min="1900"
                            max="2025"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleAgreementChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="agreement" className="text-sm">
                    Souhlasím se zpracováním osobních údajů a s pravidly turnaje. Souhlasím s použitím fotografií a videí pro propagační účely. *
                  </label>
                </div>
                
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odesílám...' : 'Odeslat přihlášku'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection; 