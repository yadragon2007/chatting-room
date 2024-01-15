function scroll() {
  let chatPage = document.getElementById("messages");
  chatPage.scrollTo(0, chatPage.scrollHeight);
}
function menu(type) {
  const friends = document.getElementById("friends");
  const rooms = document.getElementById("rooms");
  const friendBtn = document.getElementById('friends-btn')
  const roomsBtn = document.getElementById('rooms-btn')

  if (type == "friends") {
    rooms.style.opacity = "0";

    friendBtn.style.borderBottom = '3px #22668D solid';
    roomsBtn.style.borderBottom = 'none';

    setTimeout(() => {
      friends.style.display = "block";
      friends.style.opacity = "1";
      rooms.style.display = "none";
    }, 250);
  } else if (type == "rooms") {
    friends.style.opacity = "0";

    roomsBtn.style.borderBottom = '3px #22668D solid';
    friendBtn.style.borderBottom = 'none';
    setTimeout(() => {
      rooms.style.display = "block";
      rooms.style.opacity = "1";
      friends.style.display = "none";
    }, 250);
  }
}
function CreateRoom() {
  const createRoomContainer = document.getElementById('createRoom-container')
  
  if (createRoomContainer.style.display == 'none') {
    createRoomContainer.style.display = 'block'
  }else{
    createRoomContainer.style.display = 'none'
  }
}