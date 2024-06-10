"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketConfig = (io) => {
    let users = [];
    function addUser(userId, socketId) {
        const isUserPresent = users.some((user) => user.userId === userId);
        if (!isUserPresent)
            return users.push({ userId, socketId });
    }
    function removeUser(socketId) {
        return (users = users.filter((user) => user.socketId !== socketId));
    }
    function getUser(userId) {
        return users.find((user) => user.userId === userId);
    }
    io.on("connection", (socket) => {
        console.log("User connected");
        // When a user connects
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });
        // Send and receive messages
        socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
            const user = getUser(receiverId);
            io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("getMessage", {
                senderId,
                text,
                conversationId,
            });
            // Emit an event to update the last message
            io.emit("updateLastMessage", { conversationId: conversationId, lastMessage: { text, senderId, createdAt: Date.now() } });
        });
        // When a user disconnects
        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("A user has been disconnected");
            io.emit("getUsers", users);
        });
    });
};
exports.default = socketConfig;
