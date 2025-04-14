# Street Cup 2025 - Basketbalový turnaj

Webová aplikace pro basketbalový turnaj Street Cup 2025. Jedná se o single page aplikaci vytvořenou pomocí Next.js, React, TypeScript a Tailwind CSS.

## Funkce

- Responzivní design pro všechna zařízení
- Sekce: O turnaji, Pravidla, Historie, Fotogalerie, Přihláška, Kontakty
- Registrační formulář pro týmy s odesíláním e-mailů
- Moderní design v oranžovo-černo-bílé barevné paletě

## Technologie

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **E-mail**: Nodemailer

## Instalace a spuštění

1. Naklonujte repozitář:

```bash
git clone <url-repozitare>
cd street-cup-2025
```

2. Nainstalujte závislosti:

```bash
npm install
```

3. Vytvořte soubor `.env.local` se správnými údaji:

```
# E-mailové nastavení - SendGrid
SENDGRID_API_KEY=SG.YOUR_API_KEY_HERE

# E-mailové adresy
EMAIL_FROM=info@streetcup2025.cz
ADMIN_EMAIL=admin@streetcup2025.cz
```

Pro více informací o nastavení SendGrid viz `SENDGRID_SETUP.md`

4. Umístěte obrázky do složky:
   - Hero obrázek uložte jako `public/foto_street_2024.jpg`
   - Další obrázky galerie do složky `public/images/`

5. Spusťte vývojový server:

```bash
npm run dev
```

6. Otevřete prohlížeč na adrese [http://localhost:3000](http://localhost:3000).

## Produkční build

Pro vytvoření produkční verze:

```bash
npm run build
npm start
```

## Přizpůsobení

- Barevná paleta je definována v `tailwind.config.js`
- Obsah jednotlivých sekcí můžete upravit v příslušných komponentách v adresáři `components/`
- Pro přidání vlastních obrázků nahrajte soubory do adresáře `public/images/`
- E-mailovou konfiguraci nastavte v souboru `.env.local`

## Kontakt

Pro dotazy ohledně tohoto projektu nás kontaktujte na e-mailu info@streetcup2025.cz.

## Licence

Tento projekt je licencován pod licencí MIT. 