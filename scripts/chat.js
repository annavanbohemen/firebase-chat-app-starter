// function submitUserName() {
//   var inputField = document.getElementById('username');
//   var newUserName = inputField.value;
//   console.log(newUserName);
//   console.log('uklkj;lkj;lk');
//
// submitUserName();

var name ;
var activeUsers = [];

function submitUserName() {
  name = document.getElementById('username').value;
//  console.log(name);
  ChatApp.createOrUpdateUser(name, -1, addUser);
  document.getElementById('user-add').hidden = true;
}

function addUser(user) {
  // sometimes ChatApp.getUser would call us with an undefined
  if(user !== undefined){
    var listName = $(`<li> ${user.name} </li>`);
    var userList = $('#activeUsers');
    userList.append(listName);
  }
};


// ChatApp.addMessageListener( (x, y, z) => console.log(z) );
// to see output from callback in console

//ChatApp.addMessageListener( (type, id, data) => console.log(data) );

ChatApp.addMessageListener(addMessage, errorHandler);

function errorHandler(error){
  console.log(error);
}

function addMessage(type, id, data) {
  //console.log(data);
  if (type === "added") {
    var newContent = $(`<li> ${data.userName}: ${data.text} </li>`);
    var chatMessages = $('#chatbox');
    chatMessages.append(newContent);
  };

  // first we check data.userName exists, because it was sometimes undefined
  // then we check if the  username already exists in  our list of usernames
  if (data.userName && activeUsers.indexOf(data.userName) < 0) {
    activeUsers.push(data.userName);
    ChatApp.getUser(data.userName, addUser);
  };
};


function submitMessage() {
  var message = document.getElementById('usermsg').value;
  ChatApp.newMessage(name, message);
  document.getElementById('usermsg').value = "";
}


// ChatApp.addMessageListener = function(handler, errHandler) {
//   db
//     .collection("messages")
//     .orderBy("timestamp", "desc")
//     .limit(ChatApp.fetchSize)
//     .onSnapshot(function(snapshot) {
//       snapshot.docChanges.reverse().forEach(function(docChange) {
//         handler(docChange.type, docChange.doc.id, docChange.doc.data());
//       });
//     }, errHandler);
// };
