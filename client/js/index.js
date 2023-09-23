const socket = io();

function scrollToBottom() {
  const messages = document.getElementById("messages");
  const newMessage = messages.lastElementChild;
  const clientHeight = messages.clientHeight;
  const topScroll = messages.scrollHeight;
  const scrollHeight = messages.scrollHeight;
  const newMessageHeight = newMessage.offsetHeight;
  const lastMessageHeight = newMessage.previousSibling.offsetHeight || 0;
  console.log(
    clientHeight,
    scrollHeight,
    topScroll,

    newMessageHeight,
    lastMessageHeight
  );
  if (
    clientHeight + topScroll + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    console.log("Should scroll");
    messages.scrollTop = scrollHeight;
  }
}

socket.on("connect", () => {
  console.log("Connected to the server");
});
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", (message) => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  let template = document.getElementById("message-template").innerHTML;
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  const messages = document.getElementById("messages");
  messages.innerHTML += html;
  scrollToBottom();
});

socket.on("newLocationMessage", (message) => {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  let template = document.getElementById("location-message-template").innerHTML;
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });
  const messages = document.getElementById("messages");
  messages.innerHTML = html;
  scrollToBottom();
});

const form = document.getElementById("message-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let messageTextbox = document.querySelector("input[name='message']");

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.value,
    },
    () => {
      messageTextbox.value = "";
    }
  );
});

const locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }
  locationButton.disabled = true;
  locationButton.innerText = "Sending location...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationButton.disabled = false;
      locationButton.innerText = "Send location";
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
