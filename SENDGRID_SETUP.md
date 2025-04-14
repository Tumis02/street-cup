# Nastavení SendGrid pro Street Cup 2025

Toto je návod, jak správně nastavit odesílání e-mailů pomocí SendGrid pro webovou aplikaci Street Cup 2025.

## Krok 1: Vytvoření účtu na SendGrid

1. Přejděte na [sendgrid.com](https://sendgrid.com/) a zaregistrujte se (zdarma)
2. Potvrďte e-mail a vytvořte účet
3. Dokončete nastavení účtu

## Krok 2: Ověření odesílatele

SendGrid vyžaduje ověření e-mailu nebo domény, ze které budete odesílat:

1. V SendGrid dashboardu přejděte do **Settings** > **Sender Authentication**
2. Vyberte **Verify a Single Sender** nebo **Domain Authentication** (doporučeno pro produkci)
3. Vyplňte požadované informace
4. Dokončete ověřovací proces podle instrukcí

## Krok 3: Vytvoření API klíče

1. V dashboardu přejděte do **Settings** > **API Keys**
2. Klikněte na **Create API Key**
3. Vyberte **Full Access** nebo **Restricted Access** (stačí oprávnění pro odesílání e-mailů)
4. Zkopírujte vygenerovaný API klíč (zobrazí se pouze jednou!)

## Krok 4: Nastavení v aplikaci

1. Otevřete soubor `.env.local` a vložte API klíč:
   ```
   SENDGRID_API_KEY=SG.YOUR_API_KEY_HERE
   ```

2. Ujistěte se, že e-mail v `EMAIL_FROM` odpovídá ověřenému odesílateli z kroku 2:
   ```
   EMAIL_FROM=info@streetcup2025.cz
   ```

## Krok 5: Testování

1. V souboru `pages/api/register.ts` odkomentujte řádky pro odesílání e-mailů:
   ```javascript
   await sgMail.send(adminMailOptions);
   await sgMail.send(teamMailOptions);
   ```

2. Zkuste odeslat zkušební registraci přes formulář

## Omezení free účtu

- 100 e-mailů denně zdarma
- Vyžaduje přidání odkazu "Powered by Twilio SendGrid" do e-mailů

## Řešení problémů

- **E-maily se neodesílají**: Zkontrolujte API klíč a oprávnění
- **Chyba odesílatele**: Ujistěte se, že odesílatel byl ověřen
- **E-maily končí ve spamu**: Správně nastavte DKIM, SPF a DMARC záznamy domény

## Další informace

Podrobnější dokumentace je dostupná na [docs.sendgrid.com/for-developers](https://docs.sendgrid.com/for-developers) 