// =============================================
// app/page.tsx  — Landing page (translated)
// =============================================
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { translateText } from "@/utils/translateText";

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState<string>("en");
  const [ready, setReady] = useState(false); // prevent flicker while checking lang
  const [t, setT] = useState<{ [k: string]: string }>({});

  // Gate: if no language chosen, go to /select-language
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("site_lang") : null;
    if (!saved) {
      router.replace("/select-language");
      return; // don't mark ready; we'll navigate away
    }
    setLang(saved);
    setReady(true);
  }, [router]);

  // Load translations whenever lang changes
  useEffect(() => {
    let alive = true;
    async function run() {
      if (lang === "en") {
        if (!alive) return;
        setT({
          saveTheDate: "Save the Date",
          forOurWedding: "for our wedding in Rhode Island",
          provideLastName: "Provide your last name to Enter",
          lastNamePlaceholder: "Your last name",
        });
        return;
      }
      const phrases = [
        "Save the Date",
        "for our wedding in Rhode Island",
        "Provide your last name to Enter",
        "Your last name",
      ];
      try {
        const results = await Promise.all(phrases.map((p) => translateText(p, lang)));
        if (!alive) return;
        setT({
          saveTheDate: results[0],
          forOurWedding: results[1],
          provideLastName: results[2],
          lastNamePlaceholder: results[3],
        });
      } catch (e) {
        if (!alive) return;
        setT({
          saveTheDate: "Save the Date",
          forOurWedding: "for our wedding in Rhode Island",
          provideLastName: "Provide your last name to Enter",
          lastNamePlaceholder: "Your last name",
        });
        console.error("Translation error:", e);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [lang]);

  if (!ready) return null; // avoid layout flash while deciding

  const isEnglish = lang === "en";

  const handleChangeLanguage = () => {
    try { localStorage.removeItem("site_lang"); } catch {}
    router.push("/select-language");
  };


  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_#FFFFFF%,_#ece6da_100%)] backdrop-blur-md">
      
      {/* Language selector icon (top-right) */}
      <button
        onClick={handleChangeLanguage}
        aria-label="Change language"
        className="fixed top-3 right-3 z-[1000] p-2 rounded-full text-[#444] text-lg md:text-xl
                  bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_2px_6px_rgba(0,0,0,0.1)]
                  hover:bg-white/60 active:scale-[0.96] transition cursor-pointer"
      >
        🌎
      </button>




{/* VIDEO BACKDROP SECTION (mobile-resizes correctly) */}
<div
  aria-hidden="true"
  className="fixed left-0 top-0 -z-10 w-[100vw] h-[100svh] overflow-hidden pointer-events-none md:h-full md:inset-0"
>
  <video
    autoPlay
    loop
    muted
    playsInline
    // Force fill on both axes; object-cover keeps it pretty
    className="min-w-full min-h-full w-auto h-auto object-cover object-center"
  >
    <source src="/videos/hydrangeavid.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/70" />
</div>




<div className="mt-[65vh]">
      {/* SAVE THE DATE SECTION */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="-mt-4 sm:-mt-10 md:-mt-20 text-[#2f3a5a] font-serif
                  text-[20px] md:text-[25px]
                  tracking-[0.12em] md:tracking-[0.22em]
                  text-center [text-shadow:_0_2px_4px_rgba(0,0,0,0.28)]"
        aria-label="Save the Date"
      >
        {isEnglish ? (
          // Block-level wrapper so it can wrap on small screens
          <div
            className="w-full max-w-[90vw] mx-auto 
                      flex flex-wrap justify-center items-baseline
                      gap-x-[1em] gap-y-[0.1em]
                      drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] leading-tight"
          >

            
            {/* SAVE */}
            <span className="inline-flex items-baseline whitespace-nowrap">
              <span
                className="inline-block font-fajardose align-baseline"
                style={{ fontSize: "3.6em", lineHeight: "0.86" }}
              >
                S
              </span>
              <span className="ml-[0.08em]">AVE</span>
            </span>

            {/* THE */}
            <span className="inline-flex items-baseline whitespace-nowrap">
              <span
                className="inline-block font-fajardose  align-baseline"
                style={{ fontSize: "3.6em", lineHeight: "0.86" }}
              >
               T 
              </span>
              <span className="ml-[0.08em]">HE</span>
            </span>

            {/* DATE */}
            <span className="inline-flex items-baseline whitespace-nowrap">
              <span
                className="inline-block font-fajardose  align-baseline"
                style={{ fontSize: "3.6em", lineHeight: "0.86" }}
              >
                D
              </span>
              <span className="ml-[0.08em]">ATE</span>
            </span>
          </div>
        ) : (
          <span
            className="inline-block font-cormorant"
            style={{
              letterSpacing: "0.08em",
              textShadow: "0 2px 4px rgba(0,0,0,0.25)",
            }}
          >
            {t.saveTheDate || "Save the Date"}
          </span>
        )}
      </motion.h2>

{/* SUBTEXT UNDER SAVE THE DATE */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
  className="text-center mt-2 md:mt-4"
>
<p className="italic text-[#3e3e3e] font-cormorant text-[17px] md:text-[20px] leading-snug">
  {t.forOurWedding || "for our wedding in Rhode Island"}
</p>

  <p
    className="mt-1 text-[#2a2a2a] font-cormorant text-[17px] md:text-[20px] tracking-wide"
  >
    Amanda George &amp; Jonathan Tiller
  </p>
</motion.div>

</div>
{/* Decorative line under Save the Date */}
<div className="relative my-6 flex justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 12"
    className="w-[180px] sm:w-[220px] md:w-[260px] text-[#bda57a]/90"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.6"
  >
    <path
      d="M5 6h60c5 0 10-4 15-4s10 4 15 4h10c5 0 10-4 15-4s10 4 15 4h60"
      strokeLinecap="round"
    />
    <circle cx="100" cy="6" r="1.5" fill="currentColor" />
  </svg>
</div>


      <div className="bg-[#FFFFFF]/80 border border-[#FFFFFF]/70 rounded-md px-4 py-3 shadow-sm backdrop-blur-sm italic font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
       <label
        htmlFor="lastname"
        className="block text-[#4e5a5e] text-sm mb-1 tracking-wide italic font-light center font-cormorant"
      >
        {t.provideLastName || "Provide your last name to Enter"}
      </label>

       <input
        id="lastname"
        type="text"
        placeholder={t.lastNamePlaceholder || "Your last name"}
        className="w-60 md:w-72 px-3 py-2 border border-[#b7c3c9]/80 rounded-sm 
                  bg-[#f3f6f8]/90 text-[#334047] placeholder-[#7c8b92]
                  focus:outline-none focus:ring-1 focus:ring-[#aab8bf]
                  italic font-light font-cormorant"
      />

      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7 text-[#7C5B2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </main>
  );
}


function Leaf({
  x,
  y,
  angle = 0,
  size = 12,
  hue = 130,
  jitter = 0,
}: {
  x: number
  y: number
  angle?: number
  size?: number
  hue?: number
  jitter?: number
}) {
  const l = size;
  const j = jitter;
  const d = [
    `M 0 0`,
    `C ${0.45 * l} ${-0.35 * l + j}, ${0.95 * l} ${-0.15 * l}, ${l} 0`,
    `C ${0.95 * l} ${0.18 * l}, ${0.45 * l} ${0.35 * l - j}, 0 0`,
    'Z',
  ].join(' ');
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path
        d={d}
        fill={`hsl(${hue} 14% 62%)`}  // muted grey-green
        stroke={`hsl(${hue} 10% 55%)`}
        strokeWidth="0.25"
        opacity="0.45"
        style={{ filter: 'blur(0.3px)' }}
      />
      <path
        d={`M 0 0 C ${0.5 * l} ${-0.08 * l}, ${0.7 * l} ${-0.02 * l}, ${l * 0.95} 0`}
        fill="none"
        stroke={`hsl(${hue} 8% 48%)`}
        strokeWidth="0.3"
        strokeLinecap="round"
        opacity="0.25"
      />
    </g>
  );
}

/* =========================
   HYDRANGEA BUSHEL (side) — unchanged
   ========================= */
function HydrangeaBushel({ side }: { side: "left" | "right" }) {
  const floretTransition = { type: "spring" as const, stiffness: 200, damping: 18 };
  const bloomTransition = { type: "spring" as const, stiffness: 160, damping: 20 };

  const Floret = ({ x, y, index, size = 1, hue }: { x: number; y: number; index: number; size?: number; hue: number }) => {
    const rot = (index * 37) % 360;
    const pSize = 4.4 * size;
    const gap = 1.9 * size;
    const light = 72 + ((index * 7) % 8) - 4;
    const sat = 28 + ((index * 5) % 8);

    return (
      <motion.g initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...floretTransition, delay: 0.1 + index * 0.012 }}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i * 90 + rot) * (Math.PI / 180);
          const px = x + Math.cos(a) * gap;
          const py = y + Math.sin(a) * gap;
          return (
            <ellipse key={i} cx={px} cy={py} rx={pSize} ry={pSize * 0.84} transform={`rotate(${i * 90 + rot} ${px} ${py})`} fill={`hsl(${hue} ${sat}% ${light}%)`} stroke={`hsl(${hue} 34% 52%)`} strokeWidth="0.55" strokeOpacity={0.38} filter="url(#petalShade)" />
          );
        })}
        <circle cx={x} cy={y} r={1.05 * size} fill="hsl(45 42% 72%)" />
      </motion.g>
    );
  };

  const BloomCluster = ({ cx, cy, radius, floretCount, hue, squash = 0.9, phase = 0 }: { cx: number; cy: number; radius: number; floretCount: number; hue: number; squash?: number; phase?: number }) => (
    <motion.g initial={{ opacity: 0, scale: 0.6, filter: "blur(2.5px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={bloomTransition}>
      <motion.g animate={{ y: [0, -1.6, 0, 1.2, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: phase }}>
        {Array.from({ length: floretCount }).map((_, i) => {
          const ang = i * Math.PI * (3 - Math.sqrt(5));
          const t = i / floretCount;
          const r = radius * Math.sqrt(t) * 0.82;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r * squash;
          return <Floret key={i} x={x} y={y} index={i} size={0.86 + t * 0.16} hue={hue} />;
        })}
      </motion.g>
    </motion.g>
  );

  const leftCenters = [
    { cx: -22, cy: -50, r: 22 },
    { cx: -112, cy: -46, r: 25 },
    { cx: -62, cy: -32, r: 26 },
    { cx: -130, cy: -26, r: 22 },
    { cx: -30, cy: -12, r: 25 },
    { cx: -116, cy: -8, r: 24 },
    { cx: -70, cy: 6, r: 20 },
    { cx: -136, cy: 10, r: 24 },
    { cx: -34, cy: 22, r: 24 },
    { cx: -104, cy: 26, r: 23 },
  ];

  const rightCenters = leftCenters.map((c, i) => ({ cx: -c.cx + (i % 3 === 0 ? 2 : -2), cy: c.cy + (i % 4 === 0 ? -1 : 1), r: c.r + (i % 5 === 0 ? 1 : 0) }));

  const paletteHue = side === "left" ? 198 : 201;
  const clusters = (side === "left" ? leftCenters : rightCenters).map((c, i) => ({ cx: c.cx, cy: c.cy, radius: c.r, florets: 20 + ((i * 3) % 10), hue: paletteHue + ((i % 4) - 1), phase: 0.05 * i, squash: 0.9 + (i % 3) * 0.01 }));

  return (
    <svg
      viewBox={side === "left" ? "-190 -120 190 240" : "0 -120 190 240"}
      className="w-[44vw] sm:w-[38vw] md:w-[34vw] max-w-[420px] h-auto"
      role="img"
    >
      {/* <title>{side === "left" ? "Left hydrangea bushel" : "Right hydrangea bushel"}</title> */}
      <defs>
        <filter id="petalShade" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.0" floodColor="hsl(200 40% 50%)" floodOpacity="0.30" />
        </filter>
        <linearGradient id="pageBottomFade" x1="0" y1="-120" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="bottomFadeMask">
          <rect x="-200" y="-120" width="400" height="240" fill="url(#pageBottomFade)" />
        </mask>
        <linearGradient id="stemFillWithFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(130 25% 34%)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="hsl(130 29% 31%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(130 32% 28%)" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="stemVein" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(130 18% 22%)" />
          <stop offset="100%" stopColor="hsl(130 22% 26%)" />
        </linearGradient>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.9, rotate: [-1, 1, -1], y: [0, 1.5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} style={{ mixBlendMode: "multiply" }}>
        {(side === "left"
          ? [
              { x: -152, y: -46, angle: -14, size: 32, jitter: 1 },
              { x: -124, y: 14, angle: -8, size: 30, jitter: 0.5 },
              { x: -86, y: -58, angle: 10, size: 28, jitter: 1.2 },
              { x: -48, y: 6, angle: 20, size: 24, jitter: 0.6 },
              { x: -132, y: 40, angle: -26, size: 26, jitter: 1.1 },
            ]
          : [
              { x: 122, y: -50, angle: 10, size: 32, jitter: 1 },
              { x: 116, y: 10, angle: 6, size: 30, jitter: 0.5 },
              { x: 78, y: -60, angle: -14, size: 30, jitter: 1.1 },
              { x: 44, y: 4, angle: -24, size: 24, jitter: 0.6 },
              { x: 120, y: 36, angle: 22, size: 28, jitter: 1.1 },
            ]).map((L, i) => (
          <g key={`leaf-${side}-${i}`} opacity={0.85}>
            <Leaf x={L.x} y={L.y} angle={L.angle} size={L.size} hue={120} jitter={L.jitter} />
            <Leaf x={L.x + (side === "left" ? -6 : -9)} y={L.y + 5} angle={L.angle + (side === "left" ? -8 : 8)} size={L.size * 0.8} hue={118} jitter={L.jitter * 0.6} />
          </g>
        ))}
      </motion.g>

      <motion.g animate={{ y: [0, -1, 0, 0.8, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}>
        <g mask="url(#bottomFadeMask)"></g>
        {clusters.map((c, i) => (
          <BloomCluster key={`c-${i}`} cx={c.cx} cy={c.cy} radius={c.radius} floretCount={c.florets} hue={c.hue} squash={c.squash} phase={c.phase} />
        ))}
      </motion.g>
    </svg>
  );
}