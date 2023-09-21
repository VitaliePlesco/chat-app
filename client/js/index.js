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

socket.on("newLocationMessage", (message) => {
  const liItem = document.createElement("li");
  const a = document.createElement("a");
  a.innerText = "My current location";
  liItem.textContent = `${message.from}: `;
  a.target = "_blank";
  a.href = message.url;
  liItem.appendChild(a);
  const messages = document.getElementById("messages");
  messages.appendChild(liItem);
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

const locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      alert("Unable to fetch location.");
    }
  );
});
