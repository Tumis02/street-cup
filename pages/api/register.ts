import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

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
  players: {
    name: string;
    age: string;
  }[];
  agreement: boolean;
}

// Funkce pro vytvoření těla e-mailu
const createEmailBody = (data: FormData): string => {
  const playersInfo = data.players
    .filter(player => player.name.trim() !== '')
    .map((player, index) => `Hráč ${index + 1}: ${player.name}${player.age ? `, ${player.age} let` : ''}`)
    .join('\n');

  return `
Nová registrace týmu do turnaje Street Cup 2025

=== Informace o týmu ===
Název týmu: ${data.teamName}
E-mail: ${data.email}
Telefon: ${data.phone || 'Neuvedeno'}

=== Seznam hráčů ===
${playersInfo}

Souhlas s podmínkami: Ano
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

    // Nastavení SendGrid API klíče
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

    // Nastavení e-mailu pro administrátora
    const adminMailOptions = {
      to: process.env.ADMIN_EMAIL || 'admin@streetcup2025.cz',
      from: process.env.EMAIL_FROM || 'info@streetcup2025.cz', // Ověřený odesílatel v SendGrid
      subject: `Nová registrace týmu: ${formData.teamName}`,
      text: createEmailBody(formData),
    };

    // Nastavení potvrzovacího e-mailu pro registrovaný tým
    const teamMailOptions = {
      to: formData.email,
      from: process.env.EMAIL_FROM || 'info@streetcup2025.cz', // Ověřený odesílatel v SendGrid
      subject: 'Potvrzení registrace do turnaje Street Cup 2025',
      text: `
Děkujeme za registraci vašeho týmu ${formData.teamName} do turnaje Street Cup 2025!

Toto je automatické potvrzení vaší registrace. Brzy vás budeme kontaktovat s dalšími informacemi o turnaji a platbě startovného.

S pozdravem,
Organizační tým Street Cup 2025
`,
    };

    // Odeslání e-mailů
    // V produkčním prostředí odkomentujte následující řádky
    /*
    await sgMail.send(adminMailOptions);
    await sgMail.send(teamMailOptions);
    */
    
    // Pro ukázku pouze vypisujeme do konzole
    console.log('Admin email content:', adminMailOptions);
    console.log('Team confirmation email:', teamMailOptions);

    return res.status(200).json({ success: true, message: 'Registrace byla úspěšně dokončena' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Došlo k chybě při zpracování registrace' });
  }
} 