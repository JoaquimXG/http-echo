const app = require('express')()
const loggerMiddleware = require('./app/middleware/logger')
const log = require("./app/utils/logger")

app.use(loggerMiddleware)

const HTTP_PORT = process.argv.length > 2 ? process.argv[2] : 8080

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
  res.send(`<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`)
})

app.listen(HTTP_PORT, () => log.info(`Example app listening on port ${HTTP_PORT}`))