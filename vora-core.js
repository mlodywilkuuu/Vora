// =========================================
// VORA CORE AI - Wersja 1.10 "Full Link"
// Komunikacja z rdzeniem Gemini 1.5 Flash
// =========================================

const GEMINI_API_KEY = "AIzaSyCxV2bQ4jD-VfVpH9Y1Y7_pIO1U90U0g8Qr";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const wyslijDoRdzeniaAI = async (userPrompt) => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            mode: 'cors', // Wymuszenie trybu CORS dla bezpiecznych połączeń
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userPrompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Szczegóły błędu:", errorData);
            return `Błąd rdzenia (${response.status}). Mateusz, upewnij się, że klucz API w pliku vora-core.js jest poprawny.`;
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Rdzeń AI nie zwrócił tekstu. Spróbuj zadać inne pytanie.";
        }

    } catch (error) {
        console.error("BŁĄD KRYTYCZNY:", error);
        return "Nadal mam błąd połączenia. Mateusz, jeśli to czytasz, kliknij F12, wejdź w zakładkę 'Console' i powiedz mi, co tam jest napisane na czerwono.";
    }
};
