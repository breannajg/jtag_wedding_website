import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LanguageModal({ onSelect }: { onSelect: (lang: string) => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const languages = [
    { label: 'English', code: 'en' },
    { label: 'Hindi', code: 'hi' },
    { label: 'French', code: 'fr' },
    { label: 'Malayalam', code: 'ml' },
  ]


  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const handleLanguageSelect = (lang: string) => {
    onSelect(lang)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h2 className="text-2xl font-serif mb-4 text-neutral-800">Select Your Language</h2>
            <p className="mb-6 text-neutral-700 text-sm">Choose a preferred language to browse the site:</p>
            <div className="grid grid-cols-2 gap-4">
              {languages.map(({ label, code }) => (
                <button
                  key={code}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-full transition text-sm"
                  onClick={() => handleLanguageSelect(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
