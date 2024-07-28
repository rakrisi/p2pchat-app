const socket = io();

const joinRoomDiv = document.getElementById('join-room');
const chatRoomDiv = document.getElementById('chat-room');
const roomCodeInput = document.getElementById('room-code');
const joinButton = document.getElementById('join-button');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

joinButton.addEventListener('click', () => {
  const roomCode = roomCodeInput.value;
  if (roomCode) {
    socket.emit('join', roomCode);
    joinRoomDiv.classList.add('hidden');
    chatRoomDiv.classList.remove('hidden');
  }
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.emit('message', message);
    addMessage('You', message);
    messageInput.value = '';
  }
});

socket.on('message', (message) => {
  addMessage('Peer', message);
});

function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  messagesDiv.appendChild(messageElement);
}
