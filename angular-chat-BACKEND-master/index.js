var express=require("express");
var app=express();
var server=require('http').Server(app);
var io=require("socket.io")(server,{
	cors:{
		origin:'*'
	}
});

var mensajes=[{
	usuario:"Ricardo Montaner",
	mensajes:"Hola amigos que intro mas epica no?"
}];

//CONEXION AL SOCKET
io.on("connection",(socket)=>{
	var host=socket.handshake.headers.host;
	var {nameRoom}=socket.handshake.query;

	console.log(host+" se ha conectado");
	socket.join(nameRoom);
	socket.emit("mensajes",mensajes);

	socket.on("mensajes",datos =>{
		mensajes.push(datos);

		socket.to(nameRoom).emit("mensajes",mensajes);
		socket.emit("mensajes",mensajes)
	})
});

server.listen(4000,()=>{
	console.log("Conexion al servidor establecida");
});
