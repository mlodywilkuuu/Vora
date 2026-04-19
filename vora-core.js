// ============================================================
// VORA CORE AI - Silnik Logiki i Komunikacji
// Wersja: 1.0 "Flash Connect"
// Autoryzacja: Google Gemini AI
// ============================================================

// === TWOJA KONFIGURACJA GEMINI AI (Mateusz!) ===
// Klucz pobrany bezpiecznie z projektu.
const GEMINI_API_KEY = "AIzaSyCxV2bQ4jD-VfVpH9Y1Y7_pIO1U90U0g8Q";
// Używamy modelu 1.5-flash dla maksymalnej szybkości reakcji.
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ============================================================
// FUNKCJE RDZENIA AI (API)
// ============================================================

/**
 * Główna funkcja wysyłająca zapytanie do Google Gemini AI.
 * @param {string} promptText - Tekst zapytania od użytkownika.
 * @returns {Promise<string>} - Obietnica zwracająca tekst odpowiedzi AI.
 */
export const wyslijZapytanieDoGemini = async (promptText) => {
    // Przygotowanie payloadu w formacie wymaganym przez Google API (v1beta)
    const payload = {
        contents: [{
            parts: [{ text: promptText }]
        }]
    };

    try {
        // WYŚLIJ PRAWDZIWE ZAPYTANIE POST DO GOOGLE
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Sprawdź, czy połączenie się udało
        if (!response.ok) {
            throw new Error(`Błąd rdzenia AI. Kod odpowiedzi: ${response.status}`);
        }

        // Sparsuj dane JSON
        const data = await response.json();

        // WYDOBĄDŹ ODPOWIEDŹ TEKSTOWĄ
        // Format Google: data.candidates[0].content.parts[0].text
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Rdzeń AI zwrócił dane w nieznanym formacie.");
        }

    } catch (error) {
        // Logowanie błędu w konsoli dla dewelopera
        console.error("VORA CORE ERROR:", error);
        // Zwróć przyjazny komunikat o błędzie dla interfejsu
        return "Przepraszam, Mateusz, ale mam chwilowy błąd połączenia z moim rdzeniem AI. Spróbuj za chwilę.";
    }
};

// ============================================================
// LOGIKA BIZNESOWA DASHBOARDA (Zarządzanie Stanem)
// ============================================================

/**
 * Generuje inteligentny tytuł czatu na podstawie pierwszej wiadomości.
 * @param {string} pierwszaWiadomosc - Tekst pierwszej wiadomości użytkownika.
 * @returns {string} - Skrócony tytuł (max 30 znaków).
 */
export const generujTytulCzatu = (pierwszaWiadomosc) => {
    let tytul = pierwszaWiadomosc.trim();
    if (tytul.length > 30) {
        tytul = tytul.substring(0, 30) + '...';
    }
    return tytul;
};

// Tutaj w przyszłości można dodać funkcje do zapisu/odczytu historii z Firebase Firestore.
// export const zapiszCzatDoBazy = async (user, chatData) => { ... }
// export const ladujHistorieUsera = async (user) => { ... }
