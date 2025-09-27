'use client'

import { useEffect, useRef, useState } from 'react'
import LanguageModal from '@/components/ui/LanguageModal'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { translateText } from '@/utils/translateText'

// Static copy
const textBlocks = {
  navHome: 'Home',
  navStory: 'Our Story',
  navRSVP: 'RSVP',
  title: 'Jon & Amanda',
  storyHeader: 'The Story of Jon & Amanda',
  story: `Following her graduation, Miss Amanda relocated from her hometown of Chattanooga, Tennessee to the greater Boston area to begin her professional career. Mr. Jon, already established in the city and focused on his own path, would soon find his world altered by Amanda's quiet arrival.

A collegial acquaintance grew into friendship in time, with weekends marked by shared excursions and an ever-deepening ease between them.

During a visit to Provincetown and the Cape Cod National Seashore, what had long remained unspoken quietly emerged. As the sun descended, Mr. Jon stepped away from their group and joined Amanda in stillness. In that moment, Amanda understood her heart.

In 2022, the couple began their courtship. Their relationship is one marked by encouragement, curiosity, and a shared delight in the everyday.

The couple became engaged in March of 2024 and look forward to celebrating their union surrounded by family and cherished friends.`,
  rsvpHeader: 'RSVP',
  rsvpText: "We can’t wait to celebrate with you! Please let us know if you'll be attending.",
}

export default function Home() {
  const [language, setLanguage] = useState('')
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false)
  const [translated, setTranslated] = useState<Record<string, string>>({})
  const isDev = process.env.NODE_ENV === 'development'

  // Video fade-in control
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (!hasChosenLanguage) return

    if (language === 'English') {
      setTranslated({})
      return
    }

    const translateAll = async () => {
      const newTranslations: Record<string, string> = {}

      if (isDev && typeof window !== 'undefined') {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('translation-')) localStorage.removeItem(key)
        })
      }

      for (const key in textBlocks) {
        const originalText = textBlocks[key as keyof typeof textBlocks]
        const cacheKey = `translation-${language}-${key}`

        if (!isDev && typeof window !== 'undefined') {
          const cached = localStorage.getItem(cacheKey)
          if (cached) {
            newTranslations[key] = cached
            continue
          }
        }

        const translatedText = await translateText(originalText, language)
        newTranslations[key] = translatedText

        if (!isDev && typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, translatedText)
        }
      }

      setTranslated(newTranslations)
    }

    translateAll()
  }, [language, hasChosenLanguage, isDev])

  const getText = (key: keyof typeof textBlocks) =>
    translated[key] || textBlocks[key]

  return (
    <>
      <LanguageModal
        onSelect={(lang) => {
          setLanguage(lang)
          setHasChosenLanguage(true)
          setVideoReady(false) // reset fade if language changes later
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-end px-6 py-4 bg-white/30 backdrop-blur-md">
        <ul className="flex gap-6 font-dm text-sm md:text-base font-normal text-neutral-800 tracking-wide antialiased">
          <li>
            <a href="#home" className="hover:text-neutral-500 transition">
              {getText('navHome')}
            </a>
          </li>
          <li>
            <a href="#love-story" className="hover:text-neutral-500 transition">
              {getText('navStory')}
            </a>
          </li>
          <li>
            <a href="#rsvp" className="hover:text-neutral-500 transition">
              {getText('navRSVP')}
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-black text-white">
        {/* Fallback image stays visible until video is decoded */}
        <Image
          src="/images/bkgrnd.jpg"
          alt="The couple"
          fill
          priority
          className={`object-cover absolute inset-0 z-0 transition-opacity duration-500 [will-change:opacity] ${
            hasChosenLanguage && videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Mount video only after language is chosen; fade it in when ready */}
        {hasChosenLanguage && (
          <video
            ref={videoRef}
            src="/videos/envvidfinal.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/bkgrnd.jpg"
            preload="auto"
            onLoadedData={() => setVideoReady(true)} // or onCanPlay
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 [will-change:opacity] ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Title appears only after a language is chosen */}
        {hasChosenLanguage && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end text-center px-4 pb-28">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-playfair italic text-5xl md:text-6xl tracking-tight drop-shadow-lg"
            >
              {getText('title')}
            </motion.h1>
          </div>
        )}
      </section>

      {/* Love Story */}
      <section id="love-story" className="relative w-full min-h-screen text-neutral-900 py-20 px-6">
        <Image
          src="/images/lovestory.jpg"
          alt="Love Story"
          fill
          className="object-cover opacity-80 z-0"
          priority
        />
        <div className="relative z-10 flex justify-start">
          <div className="w-full md:w-[40%] bg-white/70 backdrop-blur-md px-6 py-10 rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              {getText('storyHeader')}
            </h2>
            <p className="text-md md:text-lg leading-relaxed font-light whitespace-pre-line">
              {getText('story')}
            </p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-screen">
          <Image src="/images/rsvp.jpg" alt="RSVP" fill className="object-cover" priority />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2 bg-white text-black px-6 py-20 md:py-0">
          <div className="max-w-lg text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">{getText('rsvpHeader')}</h2>
            <p className="text-lg mb-6">{getText('rsvpText')}</p>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition">
              RSVP Form Coming Soon
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
