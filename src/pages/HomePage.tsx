import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Shield, MapPin, Heart, Menu, ShoppingBag, Search, User, ChevronRight, Clock, ArrowRight, Phone, Bell, Gift, Star, Smartphone, Calendar, Tag, Palette, Lock, Zap, Leaf, HardHat, ScanLine, UserPlus, CheckCircle, SmartphoneNfc, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import PsielonTagCarousel from '../components/PsielonTagCarousel';

// Placeholder blog post data
const blogPosts = [
  {
    id: "new-pet-parents",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1",
    title: "Niezbędne Wskazówki dla Nowych Opiekunów Zwierząt",
    excerpt: "Rozpoczynasz swoją podróż jako opiekun zwierzęcia? Oto kluczowe rzeczy, które musisz wiedzieć...",
    date: "15 marca 2024"
  },
  {
    id: "microchips-vs-nfc",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    title: "Zrozumienie Różnic: Mikroczipy vs Tagi NFC",
    excerpt: "Poznaj różnice między tradycyjnymi mikroczipami a nowoczesną technologią NFC...",
    date: "12 marca 2024"
  },
  {
    id: "summer-safety",
    image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3",
    title: "Przewodnik Bezpieczeństwa dla Zwierząt Latem",
    excerpt: "Zadbaj o bezpieczeństwo i komfort swoich zwierząt podczas gorących letnich miesięcy...",
    date: "10 marca 2024"
  }
];

function HomePage() {
  // Animation variants for text and button
  const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Animation variants for paw prints (floating effect)
  const pawVariants = {
    float: (i) => ({
      y: [0, -15, 0],
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.8, 0.4],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.4,
        ease: "easeInOut"
      }
    })
  };

  return (
    <>
      {/* Sekcja Hero - Clean Image with Animated Paw Prints on Right */}
      <div className="relative bg-[#f5f2ed] overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[450px] md:min-h-[650px] items-center">
          {/* Text content - Left half on md+ */}
          <div className="w-full md:w-1/2 px-4 md:px-12 max-w-7xl mx-auto text-left order-2 md:order-none relative z-10 py-8 md:py-16">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 md:mb-8 text-gray-900 leading-tight"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Bezpieczeństwo Twojego psa w nowoczesnym stylu.
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-gray-700 max-w-lg"
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              PsielonTag to innowacyjne rozwiązanie NFC, które zapewnia szybki dostęp do danych Twojego pupila – bez aplikacji, bez komplikacji.
            </motion.p>
            <motion.div
              className="text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.4 }}
            >
              <Link to="/shop">
                <button className="inline-flex items-center justify-center gap-x-3 bg-[#04515E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#03414b] transition duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl">
                  Kup Teraz
                  <PawPrint className="text-[#B1C9CD] opacity-90" size={24} />
                </button>
              </Link>
            </motion.div>
          </div>
          {/* Image - Right half on md+ with animated paw prints */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[650px] relative order-1 md:order-none">
            {/* Clean Image with No Filters */}
            <div className="absolute inset-0">
              <img
                src="/img/hero.png"
                alt="Pies w inteligentnej obroży"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Animated Paw Prints on Right Side with Varied Orientations */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[
                { left: "5%", top: "10%", initialRotate: 0 },
                { left: "25%", top: "20%", initialRotate: 45 },
                { left: "10%", top: "40%", initialRotate: -30 },
                { left: "35%", top: "55%", initialRotate: 90 },
                { left: "15%", top: "70%", initialRotate: 30 },
                { left: "40%", top: "85%", initialRotate: -45 }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#B1C9CD]"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: `rotate(${pos.initialRotate}deg)`
                  }}
                  custom={i}
                  animate="float"
                  variants={pawVariants}
                >
                  <PawPrint size={30} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja Jak To Działa */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Video Section */}
            <div className="relative order-last md:order-first rounded-lg shadow-xl overflow-hidden">
              <video
                src="/img/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Text Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 Sangria md:mb-12 text-gray-900 text-center md:text-left">
                Jak działa PsielonTag?
              </h2>
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: <ScanLine />, title: "Zbliż telefon", text: "Skanuj tag za pomocą NFC – gotowe." },
                  { icon: <UserPlus />, title: "Dodaj profil psa", text: "Wprowadź dane, zdjęcie i kontakt – wszystko, by szybko odnaleźć pupila." },
                  { icon: <CheckCircle />, title: "Błyskawiczne działanie", text: "Twój pies ma unikalny profil w kilka sekund, bez zbędnych formalności." },
                  { icon: <SmartphoneNfc />, title: "Dostęp w sekundę", text: "Każdy może zeskanować tag i uzyskać pełen dostęp do profilu – łatwo i szybko." }
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-[#04515E] rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      {React.cloneElement(step.icon, { className: "h-5 w-5 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-gray-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja Funkcji - Dlaczego PsielonTag? */}
      <div className="py-16 md:py-24 bg-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900">
            Dlaczego PsielonTag?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Shield />, title: "Bezpieczny jak mikroczip, ale widoczny", description: "Bezpieczeństwo na pierwszym planie – Widoczny tag, który działa jak mikroczip, ale jest łatwy do znalezienia." },
              { icon: <SmartphoneNfc />, title: "Działa bez aplikacji", description: "Proste jak skanowanie – Po prostu zeskanuj tag i uzyskaj pełne dane o psie, bez zbędnych aplikacji." },
              { icon: <Users />, title: "Prosty dla każdego", description: "Dla każdego, niezależnie od wieku – Z PsielonTag każdy, nawet bez doświadczenia z technologią, może łatwo zeskanować tag." },
              { icon: <Heart />, title: "Stworzony z miłości do psów", description: "PsielonTag to produkt zaprojektowany przez miłośników zwierząt, którzy doskonale rozumieją, jak ważna jest troska o bezpieczeństwo Twojego psa." }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex flex-col items-center text-center"
              >
                <div className="bg-[#e4e0d8] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  {React.cloneElement(feature.icon, { className: "h-7 w-7 md:h-8 md:w-8 text-[#04515E]" })}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sekcja Karuzeli Kolorów PsielonTag */}
      <PsielonTagCarousel />

      {/* Sekcja Bloga */}
      <div className="py-16 md:py-24 bg-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
              Najnowsze z Naszego Bloga
            </h2>
            <Link to="/blog" className="flex items-center text-[#04515E] hover:text-[#03414b] font-semibold text-sm sm:text-base">
              Zobacz Wszystkie Posty <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/blog/${post.id}`}>
                  <div className="relative overflow-hidden h-56 sm:h-64">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4 md:p-6">
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {post.date}
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[#04515E] transition duration-300 line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-3 md:mb-4 text-sm sm:text-base line-clamp-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="flex items-center text-[#04515E] font-semibold group-hover:text-[#03414b] text-sm sm:text-base">
                    Czytaj Dalej <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
