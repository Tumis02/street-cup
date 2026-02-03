import React from 'react';

const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Pravidla turnaje</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-primary">Základní pravidla</h3>
            
            <div className="space-y-6">
              <ol className="list-decimal list-inside">
                <li>Hraje se na jeden koš. Družstvo se skládá max. ze 4 hráčů.</li>
                <li>Rozpis utkání je na nástěnce.</li>
                <li><span className="font-bold"> Hrací doba je 10 min hrubého času, ale na time-outy, zapadnuté míče a na TH čas stojí.</span></li>
                <li><span className="font-bold">Hraje se oficiálním míčem FIBA 3x3</span> (žluto-fialový, velikost 6).</li>
                <li><span className="font-bold">První držení míče </span>se rozhoduje podle hodu mincí. Po vyhraném losování mincí si družstvo vybere první držení míče na začátku utkání nebo prodloužení.</li>
                <li><span className="font-bold">Každý koš dosažený uvnitř oblouku má hodnotu 1 bodu, koš dosažený za obloukem má hodnotu 2 bodů</span> – rozhodčí určuje platnost dosaženého koše, hlásí jeho hodnotu a skóre.</li>
                <li><span className="font-bold">Oddechový čas</span> - Každé družstvo má k dispozici jeden na utkání v délce 30 sekund, který si vyžádá hráč při mrtvém míči.</li>
                <li><span className="font-bold">Prodloužení</span> není limitováno časem - vyhraje družstvo, které v prodloužení první dosáhne dvou bodů.</li>
                <li><span className="font-bold">Čas na střelbu</span> - družstvo má obvykle limit 12 sekund, ale jelikož se nebude stíhat měřit čas na střelbu, tak pokud bude družstvo útok zdržovat, rozhodčí varuje družstvo, že zdržuje a odpočítává posledních pět sekund.</li>
                <li><span className="font-bold">Trestné hody: </span>
                  <ul className="list-disc list-inside">
                    <li>Jeden trestný hod za faul při střelbě uvnitř oblouku, dva trestné hody za faul při střelbě za obloukem. </li>
                    <li>Jeden trestný hod po faulu při úspěšném koši ze hry. </li>
                    <li>Technická chyba jeden trestný hod. </li>
                    <li>První nesportovní chyba dva trestné hody bez držení míče, druhá dva trestné hody a držení míče.</li>
                  </ul>
                </li>
                <li><span className="font-bold">Limity chyb družstva a hráčů:</span> 
                  <ul className="list-disc list-inside">
                    <li>Družstvo má limit 6 chyb hráčů na hřišti (hlídá zapisovatel).</li>
                    <li>Další 7., 8., 9. se trestá 2 TH. </li>
                    <li>10. a každá další chyba hráče na hřišti se trestá 2 TH + držení míče. </li>
                    <li>Nesportovní a diskvalifikační chyba se počítá jako 2 chyby družstva. </li>
                  </ul>
                </li>
                <li><span className="font-bold">Držení míče po úspěšném koši:</span> Družstvo, které dostane koš, pokud získá držení míče v oblouku pod košem, nesmí v něm být bráněno.</li>
                <li>
                  <span className="font-bold">Držení míče a možnost dát koš:</span>
                  <ul className="list-disc list-inside">
                    <li>Při mrtvém míči (rozhodčí zapíská), získá družstvo držení míče po výměně míče za obloukem.</li>
                    <li>Při úspěšném doskoku, nebo získání míče obranou, musí být míč vyvezen za oblouk.</li>
                    <li>Při situaci rozskoku získá držení míče bránící družstvo, po výměně míče za obloukem.</li>
                  </ul>
                </li>
                <li><span className="font-bold">Střídání:</span> Střídání je povoleno kterémukoliv družstvu, když je míč mrtvý, ale před získání kontroly míče. Náhradník může vstoupit do hřiště, za koncovou čarou, až po doteku se střídajícím hráčem. Střídání nevyžaduje žádnou akci rozhodčích na hřišti</li>
                <li><span className="font-bold">Poznámky:</span>
                  <ul className="list-disc list-inside">
                    <li>Hráč je za obloukem, když vykročí za oblouk a nedotýká se hřiště uvnitř oblouku, ani čáry oblouku.</li>
                    <li>Oficiální pravidla FIBA platí pro všechny situace, které nejsou výše uvedeny.</li>
                  </ul>
                </li>
                <li><span className="font-bold">Po skončení utkání:</span> Rozhodčí/zapisovatel/časoměr jdou zapsat výsledek utkání do rozpisu utkání a tabulky ve skupině. Zástupci týmů, které dohrály, si střihnou o to, který tým bude dělat rozhodčí, zapisovatele a časomíru v následujícím utkání. </li>
                <li><span className="font-bold">Rozhodčí nebude sedět.</span> Zapisovatel a časomíra mohou. Časoměřič zároveň musí otáčet skóre na tabuli.</li>
                <li><span className="font-bold">Každý hráč startuje v turnaji na vlastní nebezpečí!</span></li>
              </ol>
              
              
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection; 