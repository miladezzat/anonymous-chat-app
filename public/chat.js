const socket = io();

function setUsername() {
    let userName = document.getElementById('name').value;
    socket.emit('setUsername', userName);
    document.getElementById('userTitle').textContent = userName;
};

let user;
socket.on('userExists', function (data) {
    document.getElementById('error-container').innerHTML = data;
});

socket.on('userSet', function (data) {
    document.getElementById('login').remove();
    let messageContainer = document.getElementById('messageContainer');
    user = data.username;
    messageContainer.innerHTML = `
        <div id = "message-container"></div>
        <div class="fixed-bottom  w-25 mx-auto mb-5">
        
        <div class="form-group">
        <input class="form-control" type = "text" id = "message" placeholder="Enter your message">
        </div>
        <button class="btn btn-success btn-block" type = "button" name = "button" onclick = "sendMessage()">Send</button>
        </div>
    `;
});

function sendMessage() {
    const msg = document.getElementById('message').value;
    if (msg) {
        socket.emit('msg', { message: msg, user: user });
    }
    document.getElementById("message").value = "";
}

socket.on('newmsg', function (data) {
    if (user) {
        document.getElementById('message-container').innerHTML += '<div><b>' +
            data.user + '</b>: ' + data.message + '</div>';

        const myDiv = document.getElementById("message-container");
        myDiv.scrollTop = myDiv.scrollHeight;
    }
});