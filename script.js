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

  let userName = "";
  let userEmail = "";
  let userMessage = "";
  let currentStep = "name"; // Track the current step: "name", "email", or "message"

  const messages = {
    init: ["Hello<br />I am Jarvis<span class='emoji'>&#129302;</span>your assistant.", "How can I help you today?"],
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
    inputContainer.style.display = "none";
  });

  // Initialize Chat
  function initializeChat() {
    chatBox.innerHTML = "";
    inputContainer.style.display = "none";
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

    if (sender === "bot") {
      // Bot icon before the text
      messageElement.innerHTML = `${icon} <span>${text}</span>`;
    } else {
      // User icon after the text
      messageElement.innerHTML = `<span>${text}</span> ${icon}`;
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
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
      inputContainer.style.display = "flex";
      addMessage("bot", "Please provide your name:");
      inputField.placeholder = "Enter your name here";
      inputField.focus();
      inputField.removeEventListener("keypress", handleInput);
      inputField.addEventListener("keypress", handleInput);
    } else {
      inputContainer.style.display = "none"; // Hide input for other options
      setTimeout(() => addMessage("bot", `You selected: ${option}`), 500);
    }
  }

  // Handle Input
  function handleInput(event) {
    if (event.key === "Enter" && inputField.value.trim()) {
      const userInput = inputField.value.trim();
      inputField.value = ""; // Clear input field

      if (currentStep === "name") {
        userName = userInput;
        addMessage("user", userName);
        addMessage("bot", "Thank you! Now, please provide your email address:");
        inputField.placeholder = "Enter your email here";
        currentStep = "email";
      } else if (currentStep === "email") {
        userEmail = userInput;
        addMessage("user", userEmail);
        addMessage("bot", "Great! Finally, please type your message:");
        inputField.placeholder = "Enter your message here";
        currentStep = "message";
      } else if (currentStep === "message") {
        userMessage = userInput;
        addMessage("user", userMessage);
        addMessage("bot", `Thank you, ${userName}! We've received your message and will get back to you at ${userEmail} soon.`);
        inputContainer.style.display = "none";
        currentStep = "name";
        setTimeout(() => addMessage("bot", "Would you like to see the options again?"), 500);
        setTimeout(() => showOptions(["Show Options"]), 1000);
      }
    }
  }

  function clearOptions() {
    document.querySelectorAll(".option").forEach((el) => el.remove());
  }
});
