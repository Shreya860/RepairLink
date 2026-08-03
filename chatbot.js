import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";

// Standard Gemini Developer API (Free Tier)
const apiKey = "AQ.Ab8RN6Lroh83aVldqIVsSgHJVxTjGyI-mfbT7hGx5hW5IGIR8g";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-3.6-flash",
    systemInstruction: "You are the RepairLink assistant. You help customers find local kaarigars (repair shops), guide them on DIY fixes, and explain pricing. Be concise and friendly. DO NOT tell users to pay any fees in the dashboard. The booking is free but the actual repair cost is discussed with the kaarigar.",
});

let chat = model.startChat({ history: [] });

// UI elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

// Initialize with greeting
chatMessages.innerHTML = "";
addMessageToUI("Hi! I'm the RepairLink assistant. I can help you find repair shops, guide you on DIY fixes, or explain our pricing. How can I help?", "bot");

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
