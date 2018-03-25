var username;
var userColor;
var activeUsers = [];

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

    // this function is called, when ChatApp.getUser is done
    // userData contains username + color
    // add the message to HTML with color if the user is not in activeUsers
    // otherwise only the message without the color
    function callbackGetUser(userData) {
      if (activeUsers.indexOf(messageData.userName) < 0) {
        // addUser(messageData.userName);
        console.log(userData);

        var chatbox = document.getElementById('chatbox');
        var p = document.createElement('p');
        p.innerHTML = `<p style="color:${userData.color};">${messageData.userName}: ${messageData.text}</p>`;
        chatbox.appendChild(p);

        // add user to the userlist li
        // and add user to activeUsers
        var linkElement = document.getElementById('userslist');
        var listItem = document.createElement('li');
        listItem.innerHTML = `<li style="color:${userData.color};">${messageData.userName}</li>`
        linkElement.appendChild(listItem);

        activeUsers.push(userName);
      } else if (activeUsers.indexOf(messageData.userName) >= 0) {
        var chatbox = document.getElementById('chatbox');
        var p = document.createElement('p');
        p.innerText = messageData.userName + ': ' + messageData.text;
        chatbox.appendChild(p);
      }
    }
  }
};

// this function will be called when ChatApp.createOrUpdateUser is done
// it will console.log
function callbackUserDatabase(userData) {
  console.log(userData);
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
