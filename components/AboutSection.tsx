import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">O turnaji</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4 text-lg">
              Street Cup 2025 je prestižní streetballový turnaj, který se bude konat v létě 2025 
              v několika městech po celé České republice. Turnaj je určen pro všechny nadšence 
              basketbalu bez ohledu na věk či zkušenosti.
            </p>
            <p className="mb-4 text-lg">
              Turnaj nabízí nejen kvalitní sportovní zážitek, ale také bohatý doprovodný program 
              včetně soutěží ve smečování, střelbě trojek a dovednostních soutěží pro všechny 
              věkové kategorie.
            </p>
            <p className="mb-4 text-lg">
              Registrovat se může každý tým se 3-4 hráči. Systém turnaje zaručuje, že si každý tým 
              zahraje minimálně 3 zápasy.
            </p>

           {/*  <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Klíčové informace</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Datum konání: <strong>červenec - srpen 2025</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Místo: <strong>Praha, Brno, Ostrava, Plzeň, České Budějovice</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Startovné: <strong>1500 Kč za tým</strong></span>
                </li>
              </ul>
            </div> */}
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-3xl font-bold mb-4">Klíčové informace</h3>
                <ul className="space-y-4 text-left">
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0"></div>
                    <span>Datum konání: <strong>26.7.2025</strong></span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0"></div>
                    <span>Místo: <strong>Tyršův stadion v Šumperku</strong></span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0"></div>
                    <span>Startovné: <strong>200 Kč za osobu</strong></span>
                  </li>                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 