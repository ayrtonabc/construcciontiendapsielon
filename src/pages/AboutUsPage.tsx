import React from 'react';
import { PawPrint, Shield, Zap, HardHat } from 'lucide-react';

function AboutUsPage() {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <style>{`
        .pattern-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2304515E' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2V6h4V4h-4V0h-2zm-12 12h4v-4h2v4h4v2h-4v4h-2v-4h-4v-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nasza Historia Section */}
        <section className="mb-20 relative">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pattern-bg" />
            <div className="flex flex-col lg:flex-row items-stretch gap-0">
              {/* Image - Full prominence */}
              <div className="lg:w-1/2 relative">
                <div className="relative h-[400px] lg:h-full">
                  <img
                    src="/img/onas.jpg"
                    alt="Zespół Psielon z psem Lolek i jego zabawką Psielon"
                    className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-t-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04515E]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#04515E]/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Lolek i jego Psielon 🍈
                  </div>
                </div>
              </div>
              {/* Text content - Equal prominence */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 flex items-center">
  <PawPrint className="h-8 w-8 mr-3 text-[#04515E] animate-pulse" /> 
  Psielon – Zaczęło się od melona. Serio 🍈
</h2>
<div className="space-y-4 text-base lg:text-lg text-gray-700 leading-relaxed">
  <p>
    Lolek – nasz pies, który w swojej kolekcji zabawek ma prawdziwy arsenał. Każda z nich ma swoją nazwę, bo Lolek uwielbia rozróżniać swoje ulubione. A co najlepsze, zawsze wie, która zabawka jest która. Wystarczy rzucić nazwę, a <strong>Lolo</strong> od razu wie, gdzie ją znaleźć i chętnie przynosi.
  </p>
  <p>
    Pewnego dnia pojawiła się nowa zabawka – wyglądała jak melon... ale nie do końca. Może pomarańcza? A może coś zupełnie innego? Z czasem, dzięki jej nietypowemu wyglądowi, zaczęła być po prostu Psielonem.
  </p>
  <p>
    I wtedy pomyśleliśmy: dlaczego nie stworzyć czegoś równie prostego i niezawodnego, jak ta zabawka – czegoś, co zapewni psu bezpieczeństwo w równie intuicyjny sposób.
  </p>
  <p>
    Tak powstał Psielon – marka, która oferuje innowacyjne akcesoria dla psów, w tym PsielonTag. Nowoczesną, cyfrową wizytówkę, która zastępuje tradycyjny identyfikator. 
  </p>
  <p>
    Naszą misją jest łączenie ludzi i psów w sposób mądry, minimalistyczny, z technologią, która działa wtedy, gdy trzeba, z designem, który cieszy oko, i miłością, która zawsze jest na pierwszym miejscu.
  </p>
  <p className="font-semibold text-[#04515E]">
    Bo wszystko zaczyna się od psa. I od melona 🐶
  </p>
</div>

              </div>
            </div>
          </div>
          {/* Decorative paw print trail */}
          <div className="absolute -bottom-12 left-0 right-0 hidden lg:block">
           
          </div>
        </section>

        {/* Nasze Wartości Section */}
        <section className="pt-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 relative">
            Nasze Wartości
            
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Bezpieczeństwo", text: "Dobrostan zwierząt to nasza priorytetowa misja. Wszystko, co robimy, jest ukierunkowane na zapewnienie bezpieczeństwa Twojego pupila." },
              { icon: Zap, title: "Prostota", text: "Technologia, która jest łatwa w użyciu. Wierzymy, że bezpieczeństwo nie musi być skomplikowane – nasze produkty są proste i intuicyjne, dostępne dla każdego." },
              { icon: HardHat, title: "Jakość", text: "Produkty stworzone, by wytrzymać. Tworzymy inteligentne i trwałe rozwiązania, które służą przez lata i zapewniają bezpieczeństwo Twojemu psu." }
            ].map((value, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#04515E]/5 to-transparent rounded-2xl group-hover:from-[#04515E]/10" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#e4e0d8]/50 flex items-center justify-center group-hover:bg-[#e4e0d8] transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-[#04515E]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-base text-gray-600">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUsPage;
