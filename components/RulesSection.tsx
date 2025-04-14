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
              <div>
                <h4 className="text-xl font-bold mb-2">1. Složení týmů</h4>
                <p>Každý tým se skládá ze 3-4 hráčů. Na hřišti hrají vždy 3 hráči z každého týmu. Tým musí nastoupit minimálně se 3 hráči, jinak bude diskvalifikován.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">2. Hrací čas</h4>
                <p>Zápasy se hrají na 15 minut čistého času nebo do dosažení 21 bodů jedním z týmů. V případě remízy se hraje prodloužení do prvního koše.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">3. Bodování</h4>
                <p>Koš z pole má hodnotu 1 bodu, koš zpoza trojkové čáry má hodnotu 2 bodů. Každý tým musí posunout míč za trojkovou čáru po každém získání míče (po koši soupeře, doskoku nebo ztrátě soupeře).</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">4. Fauly</h4>
                <p>Fauly jsou hlášeny hráči. V případě sporu rozhoduje rozhodčí. Po faulu při střelbě následuje 1 trestný hod (za 1 bod). Po 7 faulech týmu v zápase znamená každý další faul 1 trestný hod + držení míče.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">5. Střídání</h4>
                <p>Střídání je povoleno pouze při přerušení hry nebo po vstřeleném koši. Tým musí oznámit střídání rozhodčímu.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">6. Systém turnaje</h4>
                <p>Turnaj se hraje systémem skupin, následují vyřazovací zápasy. Každý tým odehraje minimálně 3 zápasy ve skupině. Postupují první dva týmy z každé skupiny. V případě rovnosti bodů rozhoduje: 1) vzájemný zápas, 2) skóre, 3) počet vstřelených bodů.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-2">7. Fair play</h4>
                <p>Očekáváme od všech účastníků dodržování principů fair play. Organizátoři si vyhrazují právo diskvalifikovat tým za nesportovní chování.</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium">
                Úplná pravidla turnaje budou zaslána všem registrovaným týmům a budou k dispozici na místě konání. Organizátoři si vyhrazují právo na změnu pravidel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection; 