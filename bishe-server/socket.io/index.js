var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io').listen(http);

// var io = require('socket.io')(http);
const express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('./public'));

var usocket = {},user = [];//user用户名，usocket用户socket
io.on('connection', function(socket){//连接

  
	socket.on('new_user', (username) => {//登录
		if(!(username in usocket)) {
			socket.username = username;
			usocket[username] = socket;
			user.push(username);
			console.log('连接'+username);
      socket.emit('login',user);
      socket.broadcast.emit('user_joined',username,(user.length-1));
			console.log('用户表'+user);
		}
  });

  
  
  socket.on('send_private_message', function(res){//私聊
		console.log(res);
		usocket[res.recipient].emit('receive_private_message', res);
	});

  

  socket.on('chatmessage', function(msg){//发广播信息
    id = socket.id;
    io.emit('chatmessage',{ msg,id});
    // console.log('message: ' + msg + socket.id);
  });

  
	socket.on('disconnect', function(){
		//移除
		if(socket.username in usocket){
			delete(usocket[socket.username]);
			user.splice(user.indexOf(socket.username), 1);
		}
		console.log('断开'+socket.username);
		socket.broadcast.emit('user_left',socket.username)
	})
});


http.listen(3001, function(){
  console.log('listening on *3001');
});




var router = express.Router();

module.exports = router;

