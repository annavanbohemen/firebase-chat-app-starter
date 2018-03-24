// function submitUserName(userData) {
//   var user = userData.name;
//   console.log(userData.name);
//   console.log(userData);
//   var linkElement = document.getElementById('addusers');
//   linkElement.innerText = user
//
// }

function submitUserName() {
  var name = document.getElementById('username').value;
//  console.log(name);
  ChatApp.createOrUpdateUser(name, -1, addUser);
}

function addUser(user) {
  console.log(user);
  var listName = $(`<li> ${user.name} </li>`);
  var userList = $('#activeUsers');
  userList.append(listName);
};

// ChatApp.addMessageListener( (x, y, z) => console.log(z) );
// to see output from callback in console

//ChatApp.addMessageListener( (type, id, data) => console.log(data) );

ChatApp.addMessageListener(addMessage);

function addMessage(type, id, data) {
  //data is an array with objects in. so foreach?
  var newContent = $(`<li> ${data.userName}: ${data.text} </li>`);
  var chatMessages = $('#chatbox');
  chatMessages.append(newContent);
};
