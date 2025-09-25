/**
 * @file server.ts
 * @description Main entry point for the Node.js application.
 * It initializes environment variables, creates the HTTP server, and manages server lifecycle.
 */

import "dotenv/config";
import http, { Server } from "http";
import app from "./src/app";

const port: number = 8080;

const startServer = (): Server => {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  // Handle server errors to restart gracefully
  server.on("error", (error: Error) => {
    console.error("Server encountered an error:", error);
    // Optional: Add logic to gracefully close resources if needed
    setTimeout(startServer, 1000); // Restart server after 1 second
  });

  // Graceful shutdown on process termination
  process.on("SIGTERM", () => {
    console.log("SIGTERM received: shutting down gracefully");
    server.close(() => {
      console.log("Server shut down");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received: shutting down gracefully");
    server.close(() => {
      console.log("Server shut down");
      process.exit(0);
    });
  });

  return server;
};

startServer();
