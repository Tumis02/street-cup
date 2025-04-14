import React from 'react';

const HistorySection: React.FC = () => {
  const historyEvents = [
    {
      year: '2022',
      title: 'První ročník Street Cup',
      description: 'První ročník se konal v Praze s účastí 24 týmů. Vítězem se stal tým "Ballers" z Prahy.',
    },
    {
      year: '2023',
      title: 'Rozšíření do dalších měst',
      description: 'Turnaj se rozšířil do Brna a Ostravy s celkovou účastí 56 týmů. Celkovým vítězem se stal tým "Street Kings" z Brna.',
    },
    {
      year: '2024',
      title: 'Mezinárodní účast',
      description: 'Do turnaje se zapojily i týmy ze Slovenska a Polska. Celkem se zúčastnilo 78 týmů. Vítězem se stal slovenský tým "Dunkers" z Bratislavy.',
    },
    {
      year: '2025',
      title: 'Jubilejní ročník',
      description: 'Očekáváme rekordní účast více než 100 týmů z celé střední Evropy. Přidáváme nové soutěže a doprovodný program.',
    },
  ];

  return (
    <section id="history" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Historie turnaje</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertikální čára časové osy */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-light"></div>
          
          {/* Historie události */}
          <div className="space-y-12">
            {historyEvents.map((event, index) => (
              <div 
                key={event.year} 
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Datum */}
                <div className="md:w-1/2 flex justify-end md:pr-8">
                  <div className={`flex items-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="p-3 bg-primary text-white font-bold rounded-lg shadow-md z-10">
                      {event.year}
                    </div>
                  </div>
                </div>
                
                {/* Bod na časové ose */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white z-10 mt-3"></div>
                
                {/* Obsah */}
                <div className="md:w-1/2 pt-2 md:pl-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
       {/*  <div className="text-center mt-16">
          <p className="text-lg mb-8">
            Street Cup se během let stal jedním z nejprestižnějších streetballových turnajů ve střední Evropě.
            Každý rok se snažíme přinést něco nového a zlepšovat organizaci i herní podmínky.
          </p>
          <div>
            <h3 className="text-2xl font-bold mb-4">Statistiky z minulých ročníků</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="block text-4xl font-bold text-primary">158</span>
                <span className="text-sm">Celkový počet týmů</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="block text-4xl font-bold text-primary">612</span>
                <span className="text-sm">Účastníků</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="block text-4xl font-bold text-primary">5</span>
                <span className="text-sm">Měst</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <span className="block text-4xl font-bold text-primary">3</span>
                <span className="text-sm">Země</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HistorySection; 