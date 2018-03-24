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
