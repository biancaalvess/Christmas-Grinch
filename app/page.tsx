"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react"; // Ícone para o botão
import Image from "next/image";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSnowflakes, setShowSnowflakes] = useState(false);

  // Função para criar o efeito de neve
  const createSnowflakes = () => {
    // Evita criar neve se não estiver no navegador
    if (typeof document === "undefined") return;

    setShowSnowflakes(true);

    // Cria 50 flocos de neve
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄️";
      // Posição aleatória na largura da tela
      snowflake.style.left = Math.random() * 100 + "%";
      // Atraso aleatório para parecer natural
      snowflake.style.animationDelay = Math.random() * 2 + "s";
      // Duração aleatória da queda
      snowflake.style.animationDuration = Math.random() * 4 + 6 + "s";
      document.body.appendChild(snowflake);

      // Remove o elemento do DOM após a animação
      setTimeout(() => snowflake.remove(), (Math.random() * 4 + 6) * 1000);
    }

    // Reseta o estado após alguns segundos (opcional)
    setTimeout(() => setShowSnowflakes(false), 3000);
  };

  // Efeito de Slideshow Automático Lento
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % grinchImages.length);
    }, 6000); // Troca a cada 6 segundos (mais lento para apreciar a imagem)

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* CAMADA 1: Slideshow de Fundo */}
      <div className="absolute inset-0 z-0">
        {grinchImages.map((src, index) => (
          <div
            key={src}
            // 'duration-[2000ms]' cria uma transição bem lenta e suave de 2 segundos
            className={`absolute inset-0 transition-opacity ease-in-out duration-[2000ms] ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Grinch Background"
              fill
              className="object-cover brightness-[0.5]" // Imagem escurecida para destacar o texto
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay sutil para textura */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")'}}></div>
      </div>

      {/* CAMADA 2: Conteúdo Lateral */}
      <div className="relative z-10 h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        
        {/* Container do Texto (Alinhado à Esquerda) */}
        <div className="max-w-2xl space-y-6 animate-fade-in">
          
          {/* Título */}
          <h1 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight drop-shadow-2xl leading-none">
            FELIZ NATAL <br />
            <span className="text-green-500">DO GRINCH</span>
          </h1>

          {/* Texto Simples / Descrição */}
          <p className="text-gray-200 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-lg drop-shadow-md border-l-4 border-green-500 pl-4">
            Talvez o Natal não venha de uma loja.<br/>
            Talvez o Natal... signifique um pouco mais.
          </p>

          {/* Botão de Efeito Especial */}
          <div className="pt-4">
            <button
              onClick={createSnowflakes}
              className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-green-600 backdrop-blur-md border border-white/20 hover:border-green-500 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              <span className="font-semibold tracking-widest text-sm uppercase">
                Ativar Magia
              </span>
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            </button>
          </div>

        </div>
      </div>

      {/* Indicador de Slide (Discreto no fundo) */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {grinchImages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentImageIndex ? "w-8 bg-green-500" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>

    </main>
  );
}