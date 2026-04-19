// =========================================
// VORA CORE AI - Wersja 1.10 "Astro"
// Rdzeń komunikacyjny dla modelu Gemini 1.5
// =========================================

// Klucz API Google Gemini (Naprawiony - zawiera końcówkę 'Qr')
const GEMINI_API_KEY = "AIzaSyCxV2bQ4jD-VfVpH9Y1Y7_pIO1U90U0g8Qr";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Główna funkcja wysyłająca zapytanie do serwerów AI.
 * @param {string} userPrompt - Treść Twojej wiadomości.
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
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        // Sprawdzenie czy odpowiedź jest poprawna (Status 200)
        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Szczegóły błędu z serwera Google:", errorBody);
            throw new Error(`Błąd serwera: ${response.status}`);
        }

        const data = await response.json();

        // Wyciąganie czystego tekstu z odpowiedzi Gemini
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Otrzymałam dane w dziwnym formacie, ale nie mogę ich odczytać. Spróbuj jeszcze raz.";
        }

    } catch (error) {
        console.error("KRYTYCZNY BŁĄD VORA CORE:", error);
        
        // Specyficzne komunikaty dla użytkownika
        if (error.message.includes("403")) {
            return "Błąd 403: Klucz API jest nieaktywny lub zablokowany. Sprawdź ustawienia w Google Cloud.";
        } else if (error.message.includes("429")) {
            return "Wysłałeś za dużo wiadomości na raz! Zwolnij trochę, daj mi odetchnąć.";
        }
        
        return "Przepraszam, Mateusz, ale mam problem z połączeniem z moim mózgiem. Sprawdź, czy masz internet lub czy klucz API w pliku vora-core.js jest poprawny.";
    }
};
