const socket = io();
socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
});

socket.emit("createMessage", {
  from: "Andrew",
  text: "Yup. That work for me.",
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
