// =============================================
// app/select-language/page.tsx
// =============================================
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LANGS = [
  { label: "English", code: "en" },
  { label: "हिन्दी (Hindi)", code: "hi" },
  { label: "Français (French)", code: "fr" },
  { label: "മലയാളം (Malayalam)", code: "ml" },
];

export default function SelectLanguagePage() {
  const router = useRouter();
  const [hiddenOverflow, setHiddenOverflow] = useState(false);

  useEffect(() => {
    // Lock scroll for this gate screen
    setHiddenOverflow(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const pick = (code: string) => {
    try {
      localStorage.setItem("site_lang", code);
    } catch {}
    router.replace("/");
  };

  return (
    <main className="relative min-h-[100dvh] w-full">
      {/* Background image */}
      <Image
        src="/images/bkgrnd.jpg"
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle gradient wash to improve contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.25))]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center p-6">
        {/* Frosted panel */}
        <div className="rounded-2xl border border-white/40 bg-white/55 backdrop-blur-lg shadow-lg p-6 sm:p-8 max-w-sm w-full text-center">
          {/* <h1 className="text-2xl font-serif text-neutral-800 mb-2">Select Your Language</h1> */}
          <p className="text-sm text-neutral-800 mb-6">Choose a language to continue.</p>

          <div className="grid grid-cols-2 gap-3">
            {LANGS.map(({ label, code }) => (
            <button
                key={code}
                onClick={() => pick(code)}
                aria-label={`Select ${label}`}
                className="
                rounded-full py-2.5 px-4 text-sm font-medium text-neutral-900
                bg-neutral-300/25 backdrop-blur-xl border border-white/40
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out
                hover:bg-neutral-400/35 hover:border-white/55 hover:shadow-[0_2px_8px_rgba(0,0,0,0.14)]
                active:bg-neutral-500/45 active:border-white/65 active:shadow-[0_1px_4px_rgba(0,0,0,0.2)] active:scale-[0.98]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
            >
                {label}
            </button>
            ))}

          </div>

          {/* Optional tiny helper text */}
          {/* <p className="mt-4 text-xs text-neutral-700/80">You can change this later from the top-right icon.</p> */}
        </div>
      </div>
    </main>
  );
}
