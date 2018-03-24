var username;

ChatApp.addMessageListener(messageHandler);

function messageHandler(changeType, messageId, messageData) {
  console.log(changeType);
  console.log(messageId);
  console.log(messageData);

  if (changeType === 'added') {
    var chatbox = document.getElementById('chatbox');
    var p = document.createElement('p');
    p.innerText = messageData.userName + ': ' + messageData.text;
    chatbox.appendChild(p);
  }
};

function callbackUserDatabase(userData) {
  console.log(userData);
  var linkElement = document.getElementById('userslist');
  var listItem = document.createElement('li');
  listItem.innerText = userData.name;
  linkElement.appendChild(listItem);
}

function parseUser() {
  username = document.getElementById('username').value;
  ChatApp.createOrUpdateUser(username, -1, callbackUserDatabase);
};

function parseUserMessage() {
  var userMessage = document.getElementById('usermsg').value;
  ChatApp.newMessage(username, userMessage);
};
