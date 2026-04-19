// VORA CORE AI - Wersja 1.10
const GEMINI_API_KEY = "AIzaSyCxV2bQ4jD-VfVpH9Y1Y7_pIO1U90U0g8Qr"; // Naprawiony klucz z końcówką 'r'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const wyslijDoRdzeniaAI = async (userPrompt) => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Szczegóły błędu API:", errorData);
            throw new Error(`Błąd API: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("VORA CORE ERROR:", error);
        return "Przepraszam, Mateusz, ale mam problem z połączeniem. Upewnij się, że Twój klucz API jest aktywny i nie ma blokady CORS.";
    }
};
