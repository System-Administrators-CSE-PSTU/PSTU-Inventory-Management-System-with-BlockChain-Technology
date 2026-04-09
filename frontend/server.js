const { createServer } = require("http");
const path = require("path");
const dotenv = require("dotenv");
const next = require("next");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
}

const dev = process.env.NODE_ENV !== "production";
const port = Number.parseInt(process.env.PORT || "", 10);

if (!Number.isFinite(port) || port <= 0) {
  throw new Error("PORT environment variable is required.");
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const baseUrl = `http://${req.headers.host || "localhost"}`;
    const requestUrl = new URL(req.url, baseUrl);
    const parsedUrl = {
      pathname: requestUrl.pathname,
      query: Object.fromEntries(requestUrl.searchParams),
    };

    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on port ${port}`);
  });
});
