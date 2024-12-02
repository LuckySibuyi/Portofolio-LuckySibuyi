function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Chatbot logic
function chatbot(input) {
  input = input.toLowerCase();
  const responses = {
    hello: "Hello, nice to meet you!",
    hi: "Hi there!",
    "how are you": "I'm doing fine, thank you for asking.",
    "what is your name": "My name is Jarvis, I'm a chatbot.",
    "what can you do": "I can chat with you and answer some simple questions.",
    "tell me a joke": "Why did the chicken go to the seance? To get to the other side.",
  };

  for (const key in responses) {
    if (input.includes(key)) {
      return responses[key];
    }
  }

  return "Sorry, I don't understand that. Please try something else.";
}

// Display user message
function displayUserMessage(message) {
  const chat = document.getElementById("chat");
  const userMessage = `<div class="message user">
    <div class="avatar" style="background-image: url('avatar.jpg');"></div>
    <div class="text">${message}</div>
  </div>`;
  chat.innerHTML += userMessage;
  chat.scrollTop = chat.scrollHeight;
}

// Display bot message
function displayBotMessage(message) {
  const chat = document.getElementById("chat");
  const botMessage = `<div class="message bot">
    <div class="avatar" style="background-image: url('bot.jpg');"></div>  
    <div class="text">${message}</div>
  </div>`;
  chat.innerHTML += botMessage;
  chat.scrollTop = chat.scrollHeight;
}

// Handle send message
function sendMessage() {
  const input = document.getElementById("input").value;
  if (input) {
    displayUserMessage(input);
    const output = chatbot(input);
    setTimeout(() => displayBotMessage(output), 1000);
    document.getElementById("input").value = "";
  }
}

// Event listeners
document.getElementById("button").addEventListener("click", sendMessage);
document.getElementById("input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Toggle chatbot visibility
const toggleButton = document.getElementById("toggleButton");
const chatbotContainer = document.getElementById("chatbotContainer");
const closeButton = document.getElementById("closeButton");

toggleButton.addEventListener("click", () => {
  chatbotContainer.style.display = "flex";
  toggleButton.style.display = "none";
});

closeButton.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
  toggleButton.style.display = "block";
});