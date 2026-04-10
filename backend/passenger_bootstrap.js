import { createServer } from "node:http";

const port = Number.parseInt(process.env.PORT || "3000", 10);

async function start() {
  try {
    await import("./server.js");
  } catch (error) {
    console.error("Primary app failed to boot. Starting fallback server.", error);

    createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Backend is initializing. Please run npm install and restart the app.");
    }).listen(port, () => {
      console.log(`Fallback server is running on port ${port}`);
    });
  }
}

start();
