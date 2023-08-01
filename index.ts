import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`);

    socket.on("select_room", (data) => {
        socket.join(data.room);
    });

    socket.on("message", (data) => {
        io.to(data.room).emit('message', data)
    })

    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
});

io.listen(port);