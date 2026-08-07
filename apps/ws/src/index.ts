import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './lib/types';
import { prisma } from "@repo/db";

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);
const PORT = 9090;

async function createUser(): Promise<SocketData> {
    const user = await prisma.user.create({
        data: {
            name: `user-${Math.random()}`,
            email: `${Math.random()}@email.com`,
            
        }
    })
    return {
        name: user.name ?? "",
        email: user.email
    };
}

io.on('connection', (socket) => {
    console.log(`a user connected with id ${socket.id}`);

    socket.on('hello', () => {
        console.log(`hello from ${socket.id}`);
    });

    socket.on('createRandomUser', async () => {
        console.log(`createRandomUser from ${socket.id}`);
        const user = await createUser();
        socket.emit('userCreated', user);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected with id ${socket.id}`);
    });
});

server.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
