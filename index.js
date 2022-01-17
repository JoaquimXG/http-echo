const app = require('express')()
const loggerMiddleware = require('./app/middleware/logger')
const log = require("./app/utils/logger")

app.use(loggerMiddleware)

const HTTP_PORT = 8080

app.get("*", (req, res) => {
    jsonResponse = {
        woo: {
            headers: {
                cookie: req.cookies,
                sessionId: req.sessionID,
                accept: req.headers.accept,
            },
            method: req.method,
            sessionId: req.sessionId,
            originalUrl: req.originalUrl,
            query: req.query,
            body: req.body,
            params: req.params,
        }
    }
    res.send(`<pre>${JSON.stringify(jsonResponse, null, 2)}</pre>`)
    // res.send("Hello")
})

app.listen(HTTP_PORT, () => log.info(`Example app listening on port ${HTTP_PORT}`))