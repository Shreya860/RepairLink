import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Standard Gemini Developer API (Free Tier)
const apiKey = "AIzaSyBhGWGZUoljRyvcrYVt2zGi_XuROCIEWyc";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the RepairLink assistant. You help customers find local kaarigars (repair shops), guide them on DIY fixes, and explain pricing. Be concise and friendly. DO NOT tell users to pay any fees in the dashboard. The booking is free but the actual repair cost is discussed with the kaarigar.",
});

let chat = model.startChat({ history: [] });

// UI elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

window.sendChatMessage = async function() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessageToUI(text, "user");
    chatInput.value = "";
    chatInput.disabled = true;
    chatSendBtn.disabled = true;
    
    const botBubble = addMessageToUI("...", "bot");

    try {
        const result = await chat.sendMessageStream(text);
        botBubble.textContent = "";
        for await (const chunk of result.stream) {
            botBubble.textContent += chunk.text();
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
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}
