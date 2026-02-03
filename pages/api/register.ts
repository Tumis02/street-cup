import type { NextApiRequest, NextApiResponse } from 'next';
import { sendRegistrationEmail, formatRegistrationEmail } from '../../lib/EmailService';
import { Player } from '../../types/player';

// Rozhraní pro odpověď
type ResponseData = {
  success: boolean;
  message: string;
};

// Rozhraní pro data z formuláře
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

// Funkce pro vytvoření HTML těla e-mailu pro administrátora
const createAdminEmailBody = (data: FormData): string => {
  const playersInfo = data.players
    .filter(player => player.name.trim() !== '')
    .map((player, index) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${player.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${player.birthYear || 'Neuvedeno'}</td>
      </tr>
    `)
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e74c3c;">Nová registrace týmu: ${data.teamName}</h2>
      
      <h3 style="color: #3498db;">Informace o týmu:</h3>
      <ul>
        <li><strong>Název týmu:</strong> ${data.teamName}</li>
        <li><strong>Kontaktní osoba:</strong> ${data.contactName || 'Neuvedeno'}</li>
        <li><strong>E-mail:</strong> ${data.email}</li>
        <li><strong>Telefon:</strong> ${data.phone || 'Neuvedeno'}</li>
        <li><strong>Souhlas s podmínkami:</strong> Ano</li>
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
          ${playersInfo}
        </tbody>
      </table>
    </div>
  `;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Ověření metody požadavku
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metoda není povolena' });
  }

  try {
    const formData: FormData = req.body;

    // Ověření dat z formuláře
    if (!formData.teamName || !formData.email) {
      return res.status(400).json({ success: false, message: 'Chybí povinné údaje' });
    }

    // Ověření, zda jsou vyplněni alespoň 3 hráči
    const validPlayers = formData.players.filter(player => player.name.trim() !== '');
    if (validPlayers.length < 3) {
      return res.status(400).json({ success: false, message: 'Tým musí mít alespoň 3 hráče' });
    }

    // E-mail pro administrátora
    const adminEmailSubject = `Nová registrace týmu: ${formData.teamName}`;
    const adminEmailBody = createAdminEmailBody(formData);
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@streetcup2025.cz';

    // Připravíme data pro potvrzovací e-mail pro tým
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
          birthYear: player.birthYear ? parseInt(player.birthYear, 10) || 0 : 0,
        })) as Player[],
    };

    // Připravíme tělo e-mailu pro tým pomocí naší šablony
    const teamEmailSubject = 'Potvrzení registrace do turnaje Street Cup 2026';
    const teamEmailBody = formatRegistrationEmail(teamInfo);

    // Odeslání e-mailů pomocí Resend
    // V produkčním prostředí odkomentujte následující řádky
    /*
    await sendRegistrationEmail(adminEmail, '', adminEmailSubject, adminEmailBody);
    await sendRegistrationEmail(formData.email, '', teamEmailSubject, teamEmailBody);
    */
    
    // Pro ukázku pouze vypisujeme do konzole
    console.log('Admin email content:', { to: adminEmail, subject: adminEmailSubject });
    console.log('Team confirmation email:', { to: formData.email, subject: teamEmailSubject });

    return res.status(200).json({ success: true, message: 'Registrace byla úspěšně dokončena' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Došlo k chybě při zpracování registrace' });
  }
} 