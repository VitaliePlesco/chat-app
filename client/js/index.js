const socket = io();
socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
  const liItem = document.createElement("li");
  liItem.textContent = `${message.from}: ${message.text}`;
  const messages = document.getElementById("messages");
  messages.appendChild(liItem);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
const form = document.getElementById("message-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector("input[name='message']").value,
    },
    () => {}
  );
});
