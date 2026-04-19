// =========================================
// VORA CORE AI - Wersja 1.10 "Mateusz Edition"
// Rdzeń komunikacyjny z Twoim kluczem API
// =========================================

// Twój klucz API z AI Studio
const GEMINI_API_KEY = "AIzaSyARcu4Hdkd0ucMyAE77kjy9jlYnldZFpCs"; 

// Adres URL do rdzenia Gemini 1.5 Flash
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Funkcja wysyłająca Twoje wiadomości do Google AI.
 */
export const wyslijDoRdzeniaAI = async (userPrompt) => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userPrompt
                    }]
                }]
            })
        });

        const data = await response.json();

        // Sprawdzenie, czy serwer Google odpowiedział poprawnie
        if (!response.ok) {
            console.error("Szczegóły błędu:", data);
            return `Błąd (${response.status}): Sprawdź konsolę (F12) - Google odrzuciło zapytanie.`;
        }

        // Pobranie tekstu z odpowiedzi Gemini
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Otrzymałam dane, ale nie zawierają one tekstu. Spróbuj zadać pytanie inaczej.";
        }

    } catch (error) {
        console.error("KRYTYCZNY BŁĄD SIECI:", error);
        return "Przepraszam Mateusz, ale mam błąd połączenia z internetem lub klucz API nie działa. Kliknij F12 i sprawdź zakładkę Console.";
    }
};
