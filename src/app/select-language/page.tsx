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


{/* Subtle gradient wash to improve button contrast */}
<div className="absolute inset-0 bg-black/20" />


{/* Content */}
<div className="relative z-10 flex min-h-[100dvh] items-center justify-center p-6">
<div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 max-w-sm w-full text-center border border-white/40">
<h1 className="text-2xl font-serif text-neutral-800 mb-2">Select Your Language</h1>
<p className="text-sm text-neutral-700 mb-6">Choose a language to continue.</p>
<div className="grid grid-cols-2 gap-3">
{LANGS.map(({ label, code }) => (
<button
key={code}
onClick={() => pick(code)}
className="rounded-full py-2.5 px-4 text-sm font-medium text-white bg-neutral-900/90 hover:bg-neutral-900 transition"
>
{label}
</button>
))}
</div>
</div>
</div>
</main>
);
}