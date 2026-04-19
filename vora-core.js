// =========================================
// VORA CORE AI - Pełna Integracja Rdzenia
// Wersja: 1.0 "Astro Connect"
// =========================================

// === KONFIGURACJA GEMINI AI ===
// Używamy jaskrawego, działającego klucza.
const GEMINI_API_KEY = "AIzaSyCxV2bQ4jD-VfVpH9Y1Y7_pIO1U90U0g8Q";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Funkcja wysyłająca zapytanie do rdzenia AI.
 * Przeniesiona do oddzielnego modułu dla stabilności i bezpieczeństwa CORS.
 * @param {string} userPrompt - Tekst zapytania od użytkownika.
 * @returns {Promise<string>} - Odpowiedź AI.
 */
export const wyslijDoRdzeniaAI = async (userPrompt) => {
    // 1. Przygotuj dane dla Google
    const payload = {
        contents: [{
            parts: [{ text: userPrompt }]
        }]
    };

    try {
        // 2. WYŚLIJ PRAWDZIWE ZAPYTANIE POST DO GOOGLE
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Błąd rdzenia AI. Kod: ${response.status}`);
        }

        const data = await response.json();

        // 3. WYDOBĄDŹ ODPOWIEDŹ Z DANYCH GOOGLE (Format v1beta)
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Rdzeń AI zwrócił dane w nieznanym formacie.");
        }

    } catch (error) {
        console.error("VORA CORE ERROR:", error);
        // Zwróć przyjazny komunikat o błędzie dla interfejsu
        return "Przepraszam, Mateusz, ale mam chwilowy błąd połączenia z moim rdzeniem AI. Spróbuj za chwilę.";
    }
};
