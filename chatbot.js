import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";

// Standard Gemini Developer API (Free Tier)
const apiKey = "REPLACE_WITH_YOUR_AI_STUDIO_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-3.6-flash",
    systemInstruction: `You are the official RepairLink AI Assistant. Your primary language is English, but you can understand Hindi (Hinglish). 

KNOWLEDGE BASE & COMPANY CONTEXT:
- Tagline & Mission: "Mat Feko, Fix Karo" and "Fix What Matters." We aim to fix India's broken relationship with consumption by breaking the "buy-and-discard" loop.
- Target Audience: 18-27 year-old urban demographic (students & young professionals) in Delhi-NCR who are digitally native and time-poor.
- The Problem We Solve: 76% of people want doorstep repair, but only 8% know who to call. We solve the Discovery Gap, Convenience Barrier, and Trust Deficit.
- How It Works (The 2-Tap Solution): 
  1. Instant Matching: Location + rating algorithm shows nearest verified artisans (kaarigars).
  2. Doorstep Logistics: In-app scheduling for pick-up and drop-off.
  3. Trust Layer: Mandatory before/after photo verifications and turnaround time guarantees.
  4. Gamified Retention: Users earn 'Waste-Points' to track their carbon footprint reduction.
- Services & Typical Cost: 
  * Shoes & Bags: ₹100 - ₹300 per repair.
  * Clothing & Alterations (Tailors): ₹100 - ₹500 per repair.
  * Appliances / Electronics: ₹1,500 - ₹8,000+ (depending on the device).
  * Watch Repair & Locksmiths available.
- Price Policy: 100% Free Booking! There are zero platform fees or markups for booking. Users pay the actual repair cost directly to the kaarigar.
- Contact: We do NOT have a WhatsApp number or customer care number. All communication happens via the app.

RULES:
1. NEVER hallucinate features, pricing, or contact numbers.
2. ALWAYS base your answers strictly on the knowledge base above. Use the exact data points (like 76% doorstep demand or ₹100-₹300 for shoes) to sound highly personalized and intelligent.
3. If someone asks for a service not listed, politely decline. We do not provide DIY guides.
4. Keep answers concise, empathetic, and formatted nicely using markdown.`
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
