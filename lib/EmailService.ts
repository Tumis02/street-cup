import { Player } from '../types/player';

interface TeamInfo {
  name: string;
  contact: {
    email: string;
    phone: string;
    name: string;
  };
  players: Player[];
}

// Deklarace typu pro SmtpJS
declare const Email: {
  send: (options: {
    SecureToken: string | undefined;
    To: string;
    Bcc: string;
    From: string;
    Subject: string;
    Body: string;
  }) => Promise<unknown>;
};

/**
 * Odešle registrační e-mail pomocí smtpjs.com bez nutnosti registrace u externích poskytovatelů
 */
export async function sendRegistrationEmail(to: string, bcc: string, subject: string, body: string): Promise<boolean> {
  // Nahrání smtpjs skriptu, pokud ještě není dostupný
  if (typeof Email === 'undefined') {
    await loadSmtpJs();
  }

  try {
    await Email.send({
      SecureToken: process.env.NEXT_PUBLIC_SMTP_SECURE_TOKEN, // Token z smtpjs.com
      To: to,
      Bcc: bcc,
      From: 'info@streetcup2025.cz', // E-mail odesílatele
      Subject: subject,
      Body: body
    });
    return true;
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    return false;
  }
}

/**
 * Dynamicky nahraje smtpjs skript
 */
async function loadSmtpJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Nepodařilo se načíst SMTP.js'));
    document.head.appendChild(script);
  });
}

// Formátování e-mailu pro potvrzení registrace
export const formatRegistrationEmail = (team: TeamInfo): string => {
  // Vytvoříme seznam hráčů
  const playersList = team.players
    .map(
      (player, index) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${player.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${player.birthYear}</td>
      </tr>
    `
    )
    .join('');

  // Vrátíme HTML e-mail
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">Street Cup 2025 - Potvrzení registrace</h2>
      
      <p>Děkujeme za registraci týmu <strong>${team.name}</strong> na turnaj Street Cup 2025!</p>
      
      <h3 style="color: #3498db;">Údaje o týmu:</h3>
      <ul>
        <li><strong>Jméno týmu:</strong> ${team.name}</li>
        <li><strong>Kontaktní e-mail:</strong> ${team.contact.email}</li>
        <li><strong>Telefonní číslo:</strong> ${team.contact.phone}</li>
      </ul>
      
      <h3 style="color: #3498db;">Seznam hráčů:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd;">Č.</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Jméno</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Rok narození</th>
          </tr>
        </thead>
        <tbody>
          ${playersList}
        </tbody>
      </table>
      
      <p>Další informace o turnaji vám budou zaslány na uvedený e-mail.</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #777;">
        S pozdravem,<br>
        Organizační tým Street Cup 2025
      </p>
    </div>
  `;
}; 