(() => {
  const chatForm = document.getElementById("chat-form");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-btn");

  if (!chatForm || !chatMessages || !messageInput || !sendButton) return;

  const assistantName = "AI Nusantara";

  appendMessage(
    chatMessages,
    assistantName,
    "Halo, saya AI Nusantara. Silakan tanya apa saja tentang integrasi sosial, Pancasila, toleransi, atau persatuan Indonesia.",
    "received",
  );

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    appendMessage(chatMessages, "Kamu", messageText, "sent");
    messageInput.value = "";
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || `HTTP ${response.status}`);
      }

      appendMessage(
        chatMessages,
        payload?.assistant || assistantName,
        payload?.reply || "Maaf, saya belum bisa menjawab sekarang.",
        "received",
      );
    } catch (error) {
      console.error("Error sending message:", error);
      appendMessage(
        chatMessages,
        assistantName,
        "Maaf, terjadi kendala saat memproses pesanmu. Coba kirim lagi sebentar lagi.",
        "received",
      );
    } finally {
      setLoading(false);
      messageInput.focus();
    }
  });

  function appendMessage(target, user, text, type) {
    const message = document.createElement("div");
    message.classList.add("message", type);

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = user;

    const messageText = document.createElement("span");
    messageText.textContent = text;

    message.appendChild(meta);
    message.appendChild(messageText);
    target.appendChild(message);
    target.scrollTop = target.scrollHeight;
  }

  function setLoading(isLoading) {
    sendButton.disabled = isLoading;
    sendButton.textContent = isLoading ? "Memproses..." : "Tanya AI";
    messageInput.disabled = isLoading;
  }
})();
