(() => {
  const chatForm = document.getElementById("chat-form");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");

  if (!chatForm || !chatMessages || !messageInput) return;

  const storedUsername = sessionStorage.getItem("username");
  const username =
    storedUsername || `Warga-${Math.floor(Math.random() * 1000)}`;
  sessionStorage.setItem("username", username);

  // Load existing messages on page load
  loadMessages();

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          message: messageText,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        messageInput.value = "";
        loadMessages(); // Reload messages after sending
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  async function loadMessages() {
    try {
      const response = await fetch("/api/messages");
      const messages = await response.json();

      chatMessages.innerHTML = ""; // Clear existing messages

      messages.forEach((data) => {
        const user = data.user || "Anonim";
        const msg = data.message || "";
        const messageType = user === username ? "sent" : "received";

        appendMessage(chatMessages, user, msg, messageType);
      });
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }

  function renderMessages(messages) {
    chatMessages.innerHTML = "";
    messages.forEach((data) => {
      const user = data?.user || "Anonim";
      const msg = data?.message || "";
      const type = user === username ? "sent" : "received";
      appendMessage(chatMessages, user, msg, type);
    });
  }

  function appendMessage(target, user, text, type) {
    const message = document.createElement("div");
    message.classList.add("message", type);

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = type === "sent" ? "Kamu" : user;

    const messageText = document.createElement("span");
    messageText.textContent = text;

    message.appendChild(meta);
    message.appendChild(messageText);
    target.appendChild(message);
    target.scrollTop = target.scrollHeight;
  }

  // Auto-refresh messages every 5 seconds
  setInterval(loadMessages, 5000);
})();
