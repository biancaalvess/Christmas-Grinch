"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Instagram, Twitter, Facebook } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function GrinchLanding() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const [currentSlide, setCurrentSlide] = useState(1)
  const [showSnowflakes, setShowSnowflakes] = useState(false)

  const createSnowflakes = () => {
    setShowSnowflakes(true)

    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div")
      snowflake.className = "snowflake"
      snowflake.textContent = "❄️"
      snowflake.style.left = Math.random() * 100 + "%"
      snowflake.style.animationDelay = Math.random() * 2 + "s"
      snowflake.style.animationDuration = Math.random() * 4 + 6 + "s"
      document.body.appendChild(snowflake)

      setTimeout(() => snowflake.remove(), (Math.random() * 4 + 6) * 1000)
    }

    setTimeout(() => setShowSnowflakes(false), 3000)
  }

  const slides = [
    { id: 1, title: "The Grinch" },
    { id: 2, title: "Holiday Magic" },
    { id: 3, title: "Christmas Story" },
    { id: 4, title: "Winter Spirit" },
    { id: 5, title: "Festive Tale" },
  ]

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length ? 1 : currentSlide + 1)
  }

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 1 ? slides.length : currentSlide - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-red-700 text-green-600 overflow-hidden flex flex-col">
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage("pt")}
          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
            language === "pt" ? "bg-green-600 text-white" : "bg-red-600/50 text-green-400 hover:bg-red-600"
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
            language === "en" ? "bg-green-600 text-white" : "bg-red-600/50 text-green-400 hover:bg-red-600"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
            language === "es" ? "bg-green-600 text-white" : "bg-red-600/50 text-green-400 hover:bg-red-600"
          }`}
        >
          ES
        </button>
      </div>

      {showSnowflakes && <div className="feliz-natal">{t.felizNatal}</div>}

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-600 rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs sm:text-sm">🎄</span>
          </div>
          <span className="text-sm sm:text-lg font-bold tracking-wider text-green-600">{t.logo}</span>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-sm tracking-wide text-green-500">
          <Link href="#" className="hover:text-green-700 transition-colors">
            {t.navHome}
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            {t.navStory}
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            {t.navGallery}
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            {t.navExperience}
          </Link>
        </nav>

        <button className="px-3 sm:px-6 py-2 bg-green-600 text-white rounded-sm font-semibold hover:bg-green-700 transition-colors text-xs sm:text-sm">
          {t.watchNow}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-6 sm:py-12 gap-6 lg:gap-0">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-xs sm:text-sm text-green-500/70 mb-2 sm:mb-4 tracking-widest">{t.character}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-wider leading-tight text-green-600">
            {t.title}
          </h1>

          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <button
              onClick={createSnowflakes}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-sm font-semibold hover:bg-green-700 transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              {t.christmasSpecial}
            </button>
            <span className="text-xs sm:text-sm text-green-400">{t.watchTrailer}</span>
          </div>

          <div className="mb-8 sm:mb-12 text-xs sm:text-sm text-green-400 space-y-1">
            <p>{t.date}</p>
            <p>{t.quality}</p>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="text-green-400 hover:text-green-600 transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-green-400 hover:text-green-600 transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-green-400 hover:text-green-600 transition-colors">
              <Facebook size={20} />
            </Link>
          </div>
        </div>

        {/* Right Section - Character and Player */}
        <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-none lg:h-80 flex items-center justify-center mb-6 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/20 to-transparent rounded-lg"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-40 sm:w-64 h-40 sm:h-64 bg-red-600/30 rounded-lg border border-green-500/30">
              <span className="text-4xl sm:text-6xl mb-2">👹</span>
              <p className="text-xs sm:text-sm text-green-500">{t.meanOne}</p>
            </div>

            <div className="absolute bottom-0 right-2 sm:right-8 bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform cursor-pointer hover:bg-green-700">
              <Play size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
            </div>
          </div>

          <p className="text-xs text-green-400 tracking-widest mb-6 sm:mb-8">{t.trailerLabel}</p>

          {/* Slide Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={prevSlide}
              className="p-2 hover:bg-red-600 rounded-sm transition-colors hover:text-green-600 flex-shrink-0"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1 sm:gap-2">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(slide.id)}
                  className={`px-2 sm:px-3 py-1 rounded-sm text-xs sm:text-sm font-semibold transition-all ${
                    currentSlide === slide.id
                      ? "bg-green-600 text-white"
                      : "bg-red-700/50 text-green-500 hover:bg-red-700"
                  }`}
                >
                  {String(slide.id).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 hover:bg-red-600 rounded-sm transition-colors hover:text-green-600 flex-shrink-0"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer Accent */}
      <div className="flex justify-center py-3 sm:py-4 border-t border-green-500/30">
        <p className="text-xs tracking-widest text-green-600">🎄 {t.footer} 🎄</p>
      </div>
    </div>
  )
}
