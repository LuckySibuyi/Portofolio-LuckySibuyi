function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Elements
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to chat
function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// API call for chatbot response
async function getBotReply(userMessage) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer YOUR_API_KEY`, // Replace with your API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // or "gpt-4" if enabled
                messages: [
                    { role: "system", content: "You are a helpful chatbot." },
                    { role: "user", content: userMessage },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content; // Extract reply from API response
    } catch (error) {
        console.error("Error fetching bot response:", error);
        return "Sorry, something went wrong. Please try again later.";
    }
}

// Send button logic
sendBtn.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, "user");
        const botReply = await getBotReply(userMessage);
        addMessage(botReply, "bot");
        userInput.value = ""; // Clear input
    }
});

// Allow pressing Enter to send message
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
