const cache: Record<string, Record<string, string>> = {}

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export async function translateText(originalText: string, targetLang: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY
  const isDev = process.env.NODE_ENV === 'development'

  // In dev, bypass cache entirely
  if (!isDev && cache[originalText]?.[targetLang]) {
    return cache[originalText][targetLang]
  }

  // Use zero-width space trick in dev to bust Google cache
  const safeOriginalText = isDev ? originalText + '\u200B' : originalText

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: safeOriginalText,
        target: targetLang,
      }),
    }
  )

  const rawText = await response.text()

  let data: any
  try {
    data = JSON.parse(rawText)
  } catch (err) {
    throw new Error('❌ Failed to parse translation response: ' + rawText)
  }

  if (!data?.data?.translations?.[0]?.translatedText) {
    throw new Error('⚠️ Invalid translation response: ' + JSON.stringify(data))
  }

  const translated = decodeHtmlEntities(data.data.translations[0].translatedText)

  // Cache only in production
  if (!isDev) {
    if (!cache[originalText]) cache[originalText] = {}
    cache[originalText][targetLang] = translated
  }

  return translated
}
