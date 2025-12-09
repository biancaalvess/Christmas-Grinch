import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Feliz Natal do Grinch",
  description: "Uma experiência visual imersiva",
  icons: {
    icon: "/icon.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geist.className} antialiased bg-black text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}