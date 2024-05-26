const http = require('http')
const express = require('express');

const path = require('path');

// importing socket.io
const {Server} = require("socket.io");
// const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
// creating an io instance -> input output and this io will be responsible to handle our sockets  
const io = new Server(server);


// socket.io connection handling 
// remember -> on connection we also get a client which will have client's information in socket.io language we say client as socket 
// suppose we have 2 users so both of them will be two different sockets 
//every socket has its own unique id 
io.on('connection', (socket)=>{
    //    console.log("A new user has connected",socket.id)

//now on backend we say that whenever something named user-message comes from our frontend so there we will have our message and we will log it here 
    socket.on('user-message', message=>{

// Now this is the basic testing part but we don't want to log the message
//  ****** INSTEAD WE WANT OUR SERVER TO SEND THIS MESSAGE TO ALL THE CLIENTS  ******
        // console.log("A New User Message :", message)

        // this part states that if some message comes from our frontend simply forward it to all 
        io.emit('message' , message)
    })
})



app.use(express.static(path.resolve('../public')));

app.get('/' , (req,res)=>{
    return (res.sendFile('/public/index.html'))
})


server.listen(9000, ()=>{
    console.log(`Server started at port:9000`);
})