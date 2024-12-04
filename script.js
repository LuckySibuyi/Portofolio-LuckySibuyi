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
  let currentStep = "name";

  const messages = {
    init: ["Hello<br />I am Jarvis<span class='emoji'>&#129302;</span>your assistant.", "How can I help you today?"],
    options: ["Skills", "Resume", "LinkedIn", "Github", "Leave a message"],
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

    messageElement.innerHTML = sender === "bot" ? `${icon} <span>${text}</span>` : `<span>${text}</span> ${icon}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Show Options
  function showOptions(options) {
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";

    options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.className = "option";
      optionElement.innerHTML = option;
      optionElement.addEventListener("click", () => handleOption(option));
      optionsContainer.appendChild(optionElement);
    });

    chatBox.appendChild(optionsContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Show Options Button
  function showOptionsButton() {
    const showOptionsBtn = document.createElement("button");
    showOptionsBtn.className = "show-options";
    showOptionsBtn.innerHTML = "Show More Options";

    const showOptionsBtnContainer = document.createElement("div");
    showOptionsBtnContainer.className = "show-options-container";

    showOptionsBtnContainer.appendChild(showOptionsBtn);

    showOptionsBtn.addEventListener("click", () => {
      showOptions(messages.options);
      showOptionsBtnContainer.remove();
    });

    chatBox.appendChild(showOptionsBtnContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Handle Option Click
  function handleOption(option) {
    addMessage("user", option);
    clearOptions();
    switch (option.toLowerCase()) {
      case "skills":
        addMessage("bot", "Here are some skills I have:<br>- JavaScript<br>- HTML & CSS<br>- React<br>- Node.js");
        break;

      case "resume":
        addMessage("bot", "You can view my resume [here](#).");
        break;

      case "github":
        addMessage("bot", "Check out my GitHub profile [here](https://github.com/yourprofile).");
        break;

      case "linkedin":
        addMessage("bot", "Visit my LinkedIn profile [here](https://linkedin.com/in/yourprofile).");
        break;

      case "leave a message":
        inputContainer.style.display = "flex";
        addMessage("bot", "Please provide your name:");
        inputField.placeholder = "Enter your name here";
        inputField.focus();
        inputField.removeEventListener("keypress", handleInput);
        inputField.addEventListener("keypress", handleInput);
        break;

      default:
        addMessage("bot", "I'm not sure how to handle that. Please choose an option from the list.");
        setTimeout(() => showOptions(messages.options), 1000);
        break;
    }

    if (option.toLowerCase() !== "leave a message") {
      inputContainer.style.display = "none";
      setTimeout(showOptionsButton, 1000);
    }
  }

  // Handle Input (Name, Email, and Message)
  function handleInput(event) {
  
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      const userInput = inputField.value.trim();

      if (userInput) {
        inputField.value = ""; 
        addMessage("user", userInput); 

        if (currentStep === "name") {
          userName = userInput;
          addMessage("bot", `Nice to meet you, ${userName}! What's your email?`);
          inputField.placeholder = "Enter your email here";
          currentStep = "email";

        } else if (currentStep === "email") {
         
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailPattern.test(userInput)) {
            userEmail = userInput;
            addMessage("bot", `Thanks! Now, type your message:`);
            inputField.placeholder = "Enter your message here";
            currentStep = "message";
          } else {
           
            addMessage("bot", "That doesn't look like a valid email address. Please try again:");
            inputField.placeholder = "Enter a valid email here";
          }

        } else if (currentStep === "message") {
          userMessage = userInput;
          addMessage("bot", `Thanks for your message, ${userName}. We'll reply to ${userEmail} soon.`);
          inputContainer.style.display = "none"; 
          currentStep = "name";
          setTimeout(() => addMessage("bot", "Is there anything else I can assist you with?"), 500);
          setTimeout(showOptionsButton, 1000);
        }
      }
    }
  }

  sendMessageButton.addEventListener("click", (event) => handleInput(event));

  function clearOptions() {
    document.querySelectorAll(".option").forEach((el) => el.remove());
  }
});
