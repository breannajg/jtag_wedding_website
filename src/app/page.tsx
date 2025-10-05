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
  const [lastName, setLastName] = useState('');
  const [needsName, setNeedsName] = useState(false);
  const isDev = process.env.NODE_ENV === 'development'

  // Video fade-in control
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 768px)')
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile('matches' in e ? e.matches : (e as MediaQueryList).matches)

    // set initial
    setIsMobile(mql.matches)

    // listen for changes
    mql.addEventListener?.('change', onChange)
    mql.addListener?.(onChange) // fallback
    return () => {
      mql.removeEventListener?.('change', onChange)
      mql.removeListener?.(onChange) // fallback
    }
  }, [])


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cached = localStorage.getItem('guest-last-name');
    if (cached) setLastName(cached);
  }, []);

  const handleProceed = () => {
    if (!lastName.trim()) {
      setNeedsName(true);
      setTimeout(() => setNeedsName(false), 400); // reset shake
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest-last-name', lastName.trim());
    }
    document.getElementById('second-page-env-opener')?.scrollIntoView({ behavior: 'smooth' });
  };
  

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

{/* Hero */}
<section id="home" className="relative w-full h-screen overflow-hidden bg-black text-white">
  {/* DESKTOP/TABLET (landscape) */}
  <div className="absolute inset-0 hidden md:block">
    <video
      src="/videos/Y.mp4"
      autoPlay
      muted
      loop
      playsInline
      poster="/images/bkgrnd.jpg"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    {/* Desktop overlay */}
    <div className="absolute inset-0 z-10">
      {/* Input */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[55%] w-[11rem] lg:w-[13rem]">
        <input
          id="last-name"
          type="text"
          placeholder="Please enter your last name"
          className="w-full px-3 py-1.5 rounded-xl bg-white/80 text-sm text-neutral-900
                     placeholder:text-neutral-500 border border-white/60 shadow-[0_6px_16px_rgba(0,0,0,0.18)]
                     backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 font-dm tracking-wide"
        />
      </div>
      {/* Carrot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[59%]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </div>
  </div>

  {/* MOBILE (portrait) */}
  <div className="absolute inset-0 md:hidden">
    <video
      src="/videos/vidlanding.mp4"
      autoPlay
      muted
      loop
      playsInline
      poster="/images/bkgrnd-mobile.jpg"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    {/* Mobile overlay */}
    <div className="absolute inset-0 z-10">
      {/* Tweak these % values to your exact frame */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[52%] w-[10.5rem]">
        <input
          id="last-name"
          type="text"
          placeholder="Please enter your last name"
          className="w-full px-3 py-1.5 rounded-xl bg-white/80 text-[11px] text-neutral-900
                     placeholder:text-neutral-500 border border-white/60 shadow-[0_6px_16px_rgba(0,0,0,0.18)]
                     backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 font-dm tracking-wide"
        />
      </div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[56%]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </div>
  </div>
</section>

      
      {/* second-page-env-opener */}
      <section id="second-page-env-opener" className="relative min-h-screen flex items-end justify-center pb-8 pb-11">

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
            key={isMobile ? 'mobile' : 'desktop'} // force reload on breakpoint switch
            ref={videoRef}
            src={isMobile ? '/videos/openedenvfinal.mp4' : '/videos/openedenvfinal.mp4'}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/bkgrnd.jpg"
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 [will-change:opacity] ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
        )}



  <div className="z-10 w-full px-4">
    <div className="mx-auto max-w-md text-center">
      <h2 className="font-playfair italic text-2xl md:text-3xl tracking-tight drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)]">
        You are Invited!
      </h2>
      {/* <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition mt-3">
        RSVP Form Coming Soon
      </button> */}

<button
  className="font-playfair tracking-normal
             text-[15px] md:text-base text-neutral-900
             px-4 py-2 rounded-full
             bg-white/40 backdrop-blur-md
             border border-white/50
             shadow-[0_2px_10px_rgba(0,0,0,0.2)]
             hover:bg-white/50 hover:border-white/60
             focus:outline-none focus:ring-2 focus:ring-black/20
             transition mt-4"
>
  RSVP Form Coming Soon
</button>




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
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              lalala
            </h2>
            <p className="text-lg mb-6">
              another section
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition">
              a button.
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
