import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";

// Standard Gemini Developer API (Free Tier)
const apiKey = "AQ.Ab8RN6Lroh83aVldqIVsSgHJVxTjGyI-mfbT7hGx5hW5IGIR8g";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-3.6-flash",
    systemInstruction: `You are the official RepairLink AI Assistant. Your primary language is English, but you can understand Hindi (Hinglish). 

KNOWLEDGE BASE:
- Tagline: "Mat Feko, Fix Karo"
- Concept: A repair-first marketplace connecting users to verified local kaarigars (artisans/repairers).
- Product: We connect users to verified local kaarigars. We do NOT provide our own repairers. We are a marketplace. We offer repair for: shoes (cobblers), watches, appliances, locks (locksmiths), and clothes (tailors). DO NOT hallucinate other services like smartphones or laptops unless specifically asked if we do them (we don't right now). We also do not provide DIY fixing guides.
- Price: 100% Free Booking! There are zero platform fees, zero markups, and no commission. Users only pay the actual repair cost directly to the kaarigar after discussing it.
- Place: Local neighborhoods. We bring physical repair shops to the smartphone screen. No showrooms.
- Promotion: Empowering local artisans while offering customers a transparent, zero-commission repair experience. All kaarigars are ID & address verified and skill-checked in person.
- Contact: We do NOT have a WhatsApp number or customer care number. All communication happens via the app.

RULES:
1. NEVER hallucinate features, pricing, or contact numbers.
2. ALWAYS base your answers strictly on the knowledge base above.
3. If someone asks for a service not listed (like mobile repair), politely say we currently focus on shoes, watches, appliances, locks, and tailoring.
4. Keep answers concise, friendly, and formatted nicely using markdown.`
});

let chat = model.startChat({ history: [] });

// UI elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

// Initialize with greeting
chatMessages.innerHTML = "";
addMessageToUI("Hi! I'm the RepairLink assistant. I can help you find local kaarigars for shoes, watches, appliances, and more. How can I help you today?", "bot");

window.sendChatMessage = async function() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessageToUI(text, "user");
    chatInput.value = "";
    chatInput.disabled = true;
    chatSendBtn.disabled = true;
    
    const botBubble = addMessageToUI("<div class='typing-indicator'><span></span><span></span><span></span></div>", "bot");

    try {
        const result = await chat.sendMessageStream(text);
        botBubble.innerHTML = "";
        let fullResponse = "";
        for await (const chunk of result.stream) {
            fullResponse += chunk.text();
            botBubble.innerHTML = marked.parse(fullResponse);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } catch (error) {
        console.error(error);
        botBubble.textContent = "Error: " + (error.message || error.toString());
    } finally {
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
    }
};

window.handleChatKey = function(e) {
    if (e.key === "Enter") {
        sendChatMessage();
    }
};

function addMessageToUI(text, sender) {
    const rowDiv = document.createElement("div");
    rowDiv.className = `chat-row ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar";
    avatar.innerHTML = sender === "bot" 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8zm4 4h.01M16 14h.01"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>`;

    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = text.includes("typing-indicator") ? text : marked.parse(text);

    if (sender === "bot") {
        rowDiv.appendChild(avatar);
        rowDiv.appendChild(msgDiv);
    } else {
        rowDiv.appendChild(msgDiv);
        rowDiv.appendChild(avatar);
    }

    chatMessages.appendChild(rowDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}
