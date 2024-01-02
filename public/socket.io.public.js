const socket = io();

function sendMessage(userId) {
  let msg = document.getElementById("msg");

  if (msg === "") return;
  // Send message to server with userId and the content of the input field
  socket.emit("public msg", msg.value, userId);
  // Clear the input field
  msg.value = "";
}

// add a new message to the chat when it receives one from server
socket.on("public msg", async function (msg, senderId) {
  let msgContainer = document.getElementById("messages");
  const userId = document.getElementById("id").value;
  let senderOrReceiver;
  if (senderId == userId) {
    senderOrReceiver = "sender";
  } else {
    senderOrReceiver = `resaver`;
  }
  // Create div for the new message
  
  msgContainer.innerHTML += `
  <div class="message-container ${senderOrReceiver}">
      <div class="message">
          <div class="message-name">${msg.senderData.name}</div>
          <div class="message-content">${msg.message}</div>
          <div class="message-time">${msg.Time}</div>
      </div>
  </div>
  
  `;
  scroll()
});
