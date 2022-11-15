const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose')
const { Server } = require("socket.io");

//router
const RoomRouter = require('./routes/RoomRoutes')

app.use(express.json())

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

mongoose.connect('mongodb://127.0.0.1/chat',()=>console.log('DB RUNNING'))

app.use('/api/room',RoomRouter)

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("send_message", (data) => {
    socket.to('global').emit("receive_message",data);
  });
  
  socket.on("join_global",(data)=>{
    socket.join(data)
    console.log(`${socket.id} joined ${data}`)
  })
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(3001, () => {
  console.log("SERVER RUNNING...");
});
