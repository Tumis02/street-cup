import { Player } from '../types/player';
import emailjs from '@emailjs/browser';

interface TeamInfo {
  name: string;
  contact: {
    email: string;
    phone: string;
    name: string;
  };
  players: Player[];
}

/**
 * Inicializuje EmailJS službu - toto je potřeba volat na startu aplikace
 */
export function initEmailService() {
  if (typeof window !== 'undefined') {
    // ID veřejného klíče z EmailJS účtu
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }
}

/**
 * Odešle registrační e-mail pomocí služby EmailJS - čistý JavaScript
 * Dokumentace: https://www.emailjs.com/docs/
 */
export async function sendRegistrationEmail(
  to: string, 
  bcc: string, 
  subject: string, 
  body: string,
  teamName: string,
  players: Player[]
): Promise<boolean> {
  try {
    // Odeslání emailu pomocí EmailJS
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', // ID služby z EmailJS
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', // ID šablony z EmailJS
      {
        to_email: to,
        bcc_email: bcc,
        subject: subject,
        message_html: body,
        from_name: 'Street Cup 2025',
        reply_to: 'info@streetcup2025.cz',
        team_name: teamName,
        player_1: players[0].name,
        player_2: players[1].name,
        player_3: players[2].name,
        player_4: players.length > 3 ? players[3].name : '',
      }
    );
    
    return true;
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    return false;
  }
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
        Organizační tým Street Cup 2026
      </p>
    </div>
  `;
}; 