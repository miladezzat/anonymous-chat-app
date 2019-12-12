const express = require('express');
var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var expressHbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');


app.get('/', function(req, res) {
    res.render('index');
});


app.use(express.static(__dirname + '/public'));


// users = [];
// io.on('connection', function(socket) {
//     socket.on('setUsername', function(data) {
//         if (users.indexOf(data) > -1) {
//             socket.emit('userExists', data + ' username is taken! Try some other username.');
//         } else {
//             users.push(data);
//             socket.emit('userSet', { username: data });
//         }
//         socket.on('disconnect', function() {
//             let newUsers = users.filter(el => {
//                 return el != data
//             });
//             users = newUsers;
//         });
//     });

//     socket.on('msg', function(data) {
//         io.sockets.emit('newmsg', data);
//     })
// });

app.listen(PORT, function() {
    console.log('listening on localhost:3000');
});