import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface Tag {
  name: string;
  description: string;
  emoji: string;
  image: string;
}

const tags: Tag[] = [
  {
    name: "Forest Vibe",
    description: "Pies wolny duchem, lubi błoto i liście",
    emoji: "🌳",
    image: "/img/1.jpg"
  },
  {
    name: "Moss Hunter",
    description: "Cichy obserwator. Zna każdą trasę w lesie",
    emoji: "🌲",
    image: "/img/2.jpg"
  },
  {
    name: "Pink Rebel",
    description: "Panna z pazurem, lubi róż, ale szczeka jak trzeba",
    emoji: "🎀💅",
    image: "/img/3.jpg"
  },
  {
    name: "Wild Tangerine",
    description: "Ekstrawertyk, z ADHD, kocha życie i patyki",
    emoji: "☀️",
    image: "/img/4.jpg"
  },
  {
    name: "Oat Milk",
    description: "Ceni styl, ciszę i poranne drzemki",
    emoji: "☕",
    image: "/img/5.jpg"
  },
  {
    name: "Sea Rover",
    description: "Surfer vibes. Wskoczy do każdej wody",
    emoji: "🌊",
    image: "/img/6.jpg"
  },
  {
    name: "Midnight Wolf",
    description: "Tajemniczy. Pewny siebie. Wieczorny spacerowicz",
    emoji: "🐺",
    image: "/img/7.jpg"
  },
];

function PsielonTagCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = tags.length;
  const visibleSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const getVisibleTags = () => {
    const start = currentIndex;
    return Array.from({ length: visibleSlides }, (_, i) => tags[(start + i) % totalSlides]);
  };

  return (
    <div className="py-16 md:py-24 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          Wybierz swój idealny PsielonTag
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 md:mb-16">
          Który kolor wybierze Twój pies? 🐶
        </p>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-6 justify-center transition-all duration-500">
            {getVisibleTags().map((tag, index) => (
              <div
                key={index}
                className="w-[280px] md:w-[300px] bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition"
              >
                <img
                  src={tag.image}
                  alt={tag.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{tag.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tag.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tag.emoji}</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#04515E] text-white rounded-full hover:bg-[#03414b] transition text-sm">
                      Kup teraz <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#04515E] text-white p-2 rounded-full hover:bg-[#03414b] transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#04515E] text-white p-2 rounded-full hover:bg-[#03414b] transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link to="/shop">
            <button className="bg-[#04515E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-base md:text-lg flex items-center justify-center mx-auto">
              Zobacz wszystkie <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PsielonTagCarousel;
