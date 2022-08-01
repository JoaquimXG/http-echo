require("dotenv").config()
const express = require('express')
const app = express()
const loggerMiddleware = require('./app/middleware/logger')
const log = require("./app/utils/logger")
const http = require("http")
const https = require("https")
const fs = require("fs")

app.use(express.json())
app.use(loggerMiddleware)

app.post("*", (req, res) => {
  jsonResponse = {
    headers: req.headers,
    cookies: req.cookies,
    sessionId: req.sessionID,
    sourceIp: req.ip,
    targetHost: req.hostname,
    method: req.method,
    originalUrl: req.originalUrl,
    query: req.query,
    body: req.body,
    params: req.params,
  }
  res.set("Server", "http-echo")
  res.send(`<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`)
})

app.get("*", (req, res) => {
  jsonResponse = {
    headers: req.headers,
    cookies: req.cookies,
    sessionId: req.sessionID,
    sourceIp: req.ip,
    targetHost: req.hostname,
    method: req.method,
    originalUrl: req.originalUrl,
    query: req.query,
    body: req.body,
    params: req.params,
  }
  res.set("Server", "http-echo")
  res.send(`<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`)
})

// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync("./ssl/local.joaquimgomez.com.key"),
  cert: fs.readFileSync("./ssl/local.joaquimgomez.com.crt"),
}, app);

httpServer.listen(process.env.HTTP_PORT, "0.0.0.0", () => {
  console.log(`HTTP Server running on port ${process.env.HTTP_PORT}`);
});

httpsServer.listen(process.env.HTTPS_PORT, "0.0.0.0", () => {
  console.log(`HTTPS Server running on port ${process.env.HTTPS_PORT}`);
});