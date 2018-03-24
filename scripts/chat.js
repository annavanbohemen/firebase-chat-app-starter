var username;
var userColor;
var activeUsers = [];

// add user to the userlist LI
// and add user to activeUsers
function addUser(userName) {
  var linkElement = document.getElementById('userslist');
  var listItem = document.createElement('li');

  listItem.innerText = userName;
  linkElement.appendChild(listItem);
  activeUsers.push(messageData.userName);
}

// add function messageHandler to ChatApp message handler
ChatApp.addMessageListener(messageHandler);

// this function handles incoming messages
// and checks if user doesn't exist in activeUsers, if not, add him with addUser
function messageHandler(changeType, messageId, messageData) {
  console.log(changeType);
  console.log(messageId);
  console.log(messageData);

  if (changeType === 'added') {
    ChatApp.getUser(messageData.userName, callbackGetUser);
    var chatbox = document.getElementById('chatbox');
    var p = document.createElement('p');
    p.innerText = messageData.userName + ': ' + messageData.text;
    chatbox.appendChild(p);
  }

  if (activeUsers.indexOf(messageData.userName) < 0) {
    addUser(messageData.userName);
  }
};

// this function will be called when ChatApp.createOrUpdateUser is done
// to add user in the userslist
function callbackUserDatabase(userData) {
  console.log(userData);
  addUser(userData.name);
};

// parse the username & usercolor from the HTML form
// and send to ChatApp.createOrUpdateUser
function parseUser() {
  username = document.getElementById('username').value;
  userColor = document.getElementById('usercolor').value;
  ChatApp.createOrUpdateUser(username, userColor, callbackUserDatabase);
};

// parse user message from the HTML form
// and send to ChatApp.newMessage
function parseUserMessage() {
  var userMessage = document.getElementById('usermsg').value;
  ChatApp.newMessage(username, userMessage);
};

// this function is called, when ChatApp.getUser is done
// userData contains username + color
function callbackGetUser(userData) {
  console.log(userData);
};
