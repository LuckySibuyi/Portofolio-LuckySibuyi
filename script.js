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
      // Ask for name if "Others" is selected
      inputContainer.style.display = "flex"; 
      addMessage("bot", "Please provide your name:");
      inputField.placeholder = "Enter your name here";
      inputField.focus();
      inputField.removeEventListener("keypress", sendMessage);
      inputField.addEventListener("keypress", collectName);
    } else {
      inputContainer.style.display = "none"; // Hide input for other options
      setTimeout(() => addMessage("bot", `You selected: ${option}`), 500);
    }
  }

  // Collect Name
  function collectName(event) {
    if (event.key === "Enter" && inputField.value.trim()) {
      const name = inputField.value.trim();
      addMessage("user", name);
      inputField.value = "";
      addMessage("bot", "Thank you! Now, please provide your email address:");
      inputField.placeholder = "Enter your email here";
      inputField.removeEventListener("keypress", collectName);
      inputField.addEventListener("keypress", collectEmail);
    }
  }

  // Collect Email
  function collectEmail(event) {
    if (event.key === "Enter" && inputField.value.trim()) {
      const email = inputField.value.trim();
      addMessage("user", email);
      inputField.value = "";
      addMessage("bot", "Great! Finally, please type your message:");
      inputField.placeholder = "Enter your message here";
      inputField.removeEventListener("keypress", collectEmail);
      inputField.addEventListener("keypress", collectMessage);
    }
  }

  // Collect Message
  function collectMessage(event) {
    if (event.key === "Enter" && inputField.value.trim()) {
      const message = inputField.value.trim();
      addMessage("user", message);
      inputField.value = "";
      addMessage("bot", "Thank you for your message! We'll get back to you soon.");
      inputContainer.style.display = "none"; // Hide input container
      inputField.removeEventListener("keypress", collectMessage);
      // Optionally, send the collected data somewhere via AJAX or similar.
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
