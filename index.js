let express = require('express')

let app = express(); // initialization for express server.

//importing middlewares.
let RequestLogger = require('./middlewares/request_logger.js')

//importing controllers.
let Error404_Handler = require('./controllers/error404_handler.js')
let Scanner = require('./controllers/scanner.js')


// using middlewares
app.use(RequestLogger.index)
app.use(express.json())
app.use(express.text())

// defining routes.
app.post('/api/scan', Scanner.index)

app.all('*', Error404_Handler.index)

// setting and starting server at port 5000.
app.listen(5000, _ => { console.log('Server Running At Port 5000...') })

