var express=require('express');
var app=express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
let port=process.env.port||3030


app.get('/',function(req,res,next){
    res.send('Home');

});

 app.get('/chat', function(req, res, next) {
  	res.sendFile(__dirname + '/public/chat.html');
  });

 app.use(express.static('public'));

 

app.get('/Home',(req,res)=>{

       res.send('Chat app HomePage!');
})

 io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  	});

      client.on('messages', function(data){
  		client.emit('thread', data);
  		client.broadcast.emit('thread', data);
  	});


  });

server.listen(port, () => console.log(`Listening on ${ port }`))