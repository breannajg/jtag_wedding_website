'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  const scrollToStory = () => {
    const el = document.getElementById('love-story')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-end px-6 py-4 bg-white/30 backdrop-blur-md">
      <ul className="flex gap-6 font-dm text-sm md:text-base font-normal text-neutral-800 tracking-wide antialiased">
        <li>
          <a
            href="#home"
            className="transition-colors duration-300 hover:text-neutral-500"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#love-story"
            className="transition-colors duration-300 hover:text-neutral-500"
          >
            Our Story
          </a>
        </li>
        <li>
          <a
            href="#rsvp"
            className="transition-colors duration-300 hover:text-neutral-500"
          >
            RSVP
          </a>
        </li>
      </ul>
    </nav>


      {/* Landing Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-black text-white">
        <Image
          src="/images/1lake.jpg"
          alt="The couple"
          fill
          className="object-cover z-0 opacity-90"
          priority
        />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif tracking-tight drop-shadow-lg"
          >
            Jon & Amanda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-2xl mt-4 italic text-neutral-200"
          >
            {/* yoyoyo check it out my sista in lovee */}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-md md:text-xl mt-6 max-w-xl text-neutral-300"
          >
            {/* Quote */}
          </motion.p>

          <motion.div
            className="mt-12 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => {
              const rsvpSection = document.getElementById('love-story')
              rsvpSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <ChevronDown size={36} className="animate-bounce text-neutral-400" />
          </motion.div>

        </div>
      
      </section>

      {/* Love Story Section */}
      <section
        id="love-story"
        className="relative w-full min-h-screen overflow-hidden text-neutral-900 py-20 px-6"
      >
        {/* Background Image */}
        <Image
          src="/images/lovestory.jpg"
          alt="Love Story"
          fill
          className="object-cover opacity-80 z-0"
          priority
        />

        {/* Text Box Wrapper */}
        <div className="relative z-10 flex justify-start">
          <div className="w-full md:w-[40%] lg:w-[45%] xl:w-[38%] bg-white/70 backdrop-blur-md px-6 py-10 rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              The Story of Jon & Amanda
            </h2>
            <p className="text-md md:text-lg leading-relaxed font-light">
              Following her graduation, Miss Amanda relocated from her hometown of Chattanooga, Tennessee, to the greater Boston area to begin her professional career. Mr. Jon, already established in the city and focused on his own path, would soon find his world altered by Amanda’s quiet arrival.
              <br /><br />
              A collegial acquaintance grew into friendship in time, with weekends marked by shared excursions and an ever-deepening ease between them.
              <br /><br />
              During a visit to Provincetown and the Cape Cod National Seashore, what had long remained unspoken quietly emerged. As the sun descended, Mr. Jon stepped away from their group and joined Amanda in stillness. In that moment, Amanda understood her heart.
              <br /><br />
              In 2022, the couple began their courtship. Their relationship is one marked by encouragement, curiosity, and a shared delight in the everyday.
              <br /><br />
              The couple became engaged in March of 2024 and look forward to celebrating their union surrounded by family and cherished friends.
            </p>
          </div>
            <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => {
              const rsvpSection = document.getElementById('rsvp')
              rsvpSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <ChevronDown size={36} className="animate-bounce text-black" />
          </motion.div>
        </div>
      </section>

<section
  id="rsvp"
  className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden"
>
  {/* Side Image Panel (left on desktop) */}
  <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-screen">
    <Image
      src="/images/rsvp.jpg"
      alt="RSVP"
      fill
      className="object-cover"
      priority
    />
  </div>

  {/* Content Area */}
  <div className="flex items-center justify-center w-full md:w-1/2 bg-white text-black px-6 py-20 md:py-0">
    <div className="max-w-lg text-center">
      <h2 className="text-3xl md:text-4xl font-serif mb-8">RSVP</h2>
      <p className="text-lg mb-6">
        We can’t wait to celebrate with you! Please let us know if you'll be attending.
      </p>
      <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition">
        RSVP Form Coming Soon
      </button>
    </div>
  </div>
</section>


    </>
  )
}
