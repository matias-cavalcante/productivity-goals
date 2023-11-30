const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = http.createServer(function (req, res) {
  let filePath = path.join(__dirname, "..", "..", "..", "front", req.url);

  if (req.url === "/") {
    filePath = path.join(__dirname, "..", "..", "..", "front", "index.html");
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType =
    {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      // Add more content types as needed
    }[extname] || "application/octet-stream";

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("Error: File not found");
      } else {
        res.writeHead(500);
        res.end("Error: Internal Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Server failed to start:", error);
  } else {
    console.log("Server is listening on port", port);
  }
});
