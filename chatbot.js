import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getVertexAI, getGenerativeModel } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-vertexai.js";

const firebaseConfig = {
  projectId: "repairlink-de1ta",
  appId: "1:4711329582:web:6e12287963fd4bd58254bf",
  storageBucket: "repairlink-de1ta.firebasestorage.app",
  apiKey: "AIzaSyDMuvy1qfYvqLP348TZB-lfxGixaJGZFrk",
  authDomain: "repairlink-de1ta.firebaseapp.com",
  messagingSenderId: "4711329582",
  measurementId: "G-BQ7PBRSGH3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const vertexAI = getVertexAI(app);
const model = getGenerativeModel(vertexAI, { 
    model: "gemini-2.5-flash-lite",
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
        botBubble.textContent = "Oops, something went wrong. Please try again.";
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
