"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

// Array com as imagens do Grinch
const grinchImages = [
  "/01.jpg",
  "/02.jpg",
  "/03.jpg",
  "/04.jpg",
  "/05.jpg",
  "/06.jpg",
  "/07.jpg",
  "/08.jpg",
];

export default function GrinchCinematicSlide() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language]; 
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSnowflakes, setShowSnowflakes] = useState(false);

  // Referência para o áudio (para não recriar a cada renderização)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Função para criar o efeito de neve e tocar música
  const createSnowflakes = () => {
    if (typeof document === "undefined") return;

    // 1. Tocar a música
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/natal.mp3"); 
        audioRef.current.volume = 0.7; // Volume 
      }
      // Reinicia a música se clicar de novo
      audioRef.current.currentTime = 0; 
      audioRef.current.play().catch((e) => console.log("Interação necessária para áudio", e));
    } catch (error) {
      console.error("Erro ao tocar áudio:", error);
    }

    // 2. Ativar visual da neve
    setShowSnowflakes(true);

    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄️";
      snowflake.style.left = Math.random() * 100 + "%";
      snowflake.style.animationDelay = Math.random() * 2 + "s";
      snowflake.style.animationDuration = Math.random() * 4 + 6 + "s";
      document.body.appendChild(snowflake);

      setTimeout(() => snowflake.remove(), (Math.random() * 4 + 6) * 1000);
    }

    setTimeout(() => setShowSnowflakes(false), 3000);
  };

  // Efeito de Slideshow Automático Lento
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % grinchImages.length);
    }, 6000); // 6 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* Botões de Tradução (Language Switcher) */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        {(['pt', 'en', 'es'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 text-[10px] sm:text-xs tracking-widest font-bold uppercase rounded-full transition-all border shadow-lg ${
              language === lang
                ? "bg-green-600 text-white border-green-500 scale-105"
                : "bg-black/40 text-white/70 border-white/20 hover:bg-black/60 hover:text-white backdrop-blur-sm"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* CAMADA 1: Slideshow de Fundo */}
      <div className="absolute inset-0 z-0">
        {grinchImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity ease-in-out duration-[2000ms] ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Grinch Background"
              fill
              className="object-cover brightness-[0.4]" // Imagem escurecida para destacar texto
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay sutil de textura */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")'}}></div>
      </div>

      {/* CAMADA 2: Conteúdo Lateral */}
      <div className="relative z-10 h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        
        <div className="max-w-3xl space-y-6 animate-fade-in">
          
          {/* Subtítulo / Personagem */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-green-500"></span>
            <span className="text-green-400 font-bold tracking-[0.2em] uppercase text-sm sm:text-base">
              {t.character}
            </span>
          </div>

          {/* Título Principal (Feliz Natal) */}
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-none drop-shadow-2xl">
            {t.felizNatal}
          </h1>

          {/* Descrição / O Grinch */}
          <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed max-w-lg border-l-4 border-green-600 pl-6 py-2">
            {t.meanOne} <span className="text-green-500 font-bold">— {t.title}</span>
          </p>

          {/* Botão de Efeito Especial + Música */}
          <div className="pt-6">
            <button
              onClick={createSnowflakes}
              className="group flex items-center gap-3 px-8 py-4 bg-green-600/90 hover:bg-green-500 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-1"
            >
              <span className="font-bold tracking-widest text-sm uppercase">
                {t.christmasSpecial}
              </span>
              <div className="bg-white/20 p-1 rounded-full group-hover:rotate-180 transition-transform duration-500">
                <Sparkles className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Footer Fixo */}
      <div className="absolute bottom-6 w-full text-center z-20 pointer-events-none">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
          {t.footer}
        </p>
      </div>

      {/* Indicador de Slide */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {grinchImages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentImageIndex ? "w-8 bg-green-500" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

    </main>
  );
}