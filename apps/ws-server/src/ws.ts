import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client"

// Create WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("🔗 New client connected");

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());
    console.log("Received data is : ", data);

    try {
      await prisma.user.create({
        data: {
          email: data.email,
          password: data.password
        }
      })

      ws.send("User created");
    } catch (error) {
       console.log("Failed to create user",error)
       ws.send("Failed to create user")
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

console.log("🚀 WebSocket server running on ws://localhost:8080");