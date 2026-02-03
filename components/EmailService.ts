// EmailService.ts - Služba pro odesílání e-mailů pomocí SmtpJS

// Typ pro e-mail
interface EmailData {
  to: string;
  from: string;
  subject: string;
  body: string;
}

// Funkce pro načtení SmtpJS skriptu (pokud ještě není načten)
const loadSmtpJsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).Email) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Nepodařilo se načíst SmtpJS skript'));
    
    document.head.appendChild(script);
  });
};

// Funkce pro odeslání e-mailu
export const sendEmail = async (data: EmailData): Promise<string> => {
  try {
    await loadSmtpJsScript();
    
    // Získání Email objektu z okna (po načtení skriptu)
    const Email = (window as any).Email;
    
    // Pro použití s vašim vlastním SMTP serverem byste použili:
    /*
    const result = await Email.send({
      Host: "váš-smtp-server.cz",
      Username: "vaše-uživatelské-jméno",
      Password: "vaše-heslo",
      To: data.to,
      From: data.from,
      Subject: data.subject,
      Body: data.body
    });
    */
    
    // Pro použití se zabezpečeným tokenem (doporučeno):
    const result = await Email.send({
      SecureToken: process.env.NEXT_PUBLIC_SMTP_SECURE_TOKEN,
      To: data.to,
      From: data.from,
      Subject: data.subject,
      Body: data.body
    });
    
    return result; // Vrátí "OK" při úspěchu
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    throw error;
  }
};

// Funkce pro odeslání registračního e-mailu
export const sendRegistrationEmail = async (
  adminEmail: string,
  teamEmail: string,
  teamName: string,
  emailContent: string
): Promise<void> => {
  try {
    // E-mail pro administrátora
    await sendEmail({
      to: adminEmail,
      from: 'info@streetcup2025.cz',
      subject: `Nová registrace týmu: ${teamName}`,
      body: emailContent
    });
    
    // Potvrzovací e-mail pro tým
    await sendEmail({
      to: teamEmail,
      from: 'info@streetcup2025.cz',
      subject: 'Potvrzení registrace do turnaje Street Cup 2026',
      body: `
        <h2>Děkujeme za registraci!</h2>
        <p>Váš tým <strong>${teamName}</strong> byl úspěšně zaregistrován do turnaje Street Cup 2026.</p>
        <p>Brzy vás budeme kontaktovat s dalšími informacemi o turnaji a platbě startovného.</p>
        <p>S pozdravem,<br>Organizační tým Street Cup 2026</p>
      `
    });
  } catch (error) {
    console.error('Chyba při odesílání registračních e-mailů:', error);
    throw error;
  }
}; 