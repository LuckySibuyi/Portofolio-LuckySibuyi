function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeButton = document.getElementById("closeButton");
  const chatBox = document.getElementById("chat");
  const inputField = document.getElementById("input");
  const sendMessageButton = document.getElementById("button");
  const refreshButton = document.querySelector(".refBtn");
  const inputContainer = document.querySelector(".input-container");

  const messages = {
    init: ["Hello! 👋", "I am your assistant.", "How can I help you today?"],
    options: ["Movies 🎥", "News 📰", "Shopping 🛍️", "Music 🎵", "Others"],
  };

  // Toggle Chatbot
  toggleButton.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    toggleButton.style.display = "none";
    initializeChat();
  });

  closeButton.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    toggleButton.style.display = "block";
  });

  refreshButton.addEventListener("click", () => {
    initializeChat();
    inputContainer.style.display = "none"; // Reset input visibility
  });

  // Initialize Chat
  function initializeChat() {
    chatBox.innerHTML = ""; // Clear chat
    inputContainer.style.display = "none"; // Hide input by default
    messages.init.forEach((message, index) => {
      setTimeout(() => addMessage("bot", message), index * 500);
    });
    setTimeout(() => showOptions(messages.options), messages.init.length * 500);
  }

  // Add Message
  function addMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.className = sender === "bot" ? "bot-message" : "user-message";
    
    const icon = sender === "bot" 
      ? `<img src="bot.jpg" alt="bot-icon" class="avatar">` 
      : `<img src="avatar.jpg" alt="user-icon" class="avatar">`;

    messageElement.innerHTML = `<span>${text}</span> ${icon} `;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
  }

  // Show Options
  function showOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.className = "option";
      optionElement.innerHTML = option;
      optionElement.addEventListener("click", () => handleOption(option));
      chatBox.appendChild(optionElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Handle Option Click
  function handleOption(option) {
    addMessage("user", option); // Show user response
    clearOptions();

    if (option.toLowerCase() === "others") {
      inputContainer.style.display = "flex"; // Show input box for "Others"
    } else {
      inputContainer.style.display = "none"; // Hide input for other options
      setTimeout(() => addMessage("bot", `You selected: ${option}`), 500);
    }
  }

  function clearOptions() {
    document.querySelectorAll(".option").forEach((el) => el.remove());
  }

  // Send Message
  sendMessageButton.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const userInput = inputField.value.trim();
    if (!userInput) return;
    addMessage("user", userInput);
    inputField.value = ""; // Clear input field
    // Simulate bot response
    setTimeout(() => addMessage("bot", "Message sent to Lucky Sibuyi!"), 1000);
  }
});
