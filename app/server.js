const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongo = require('./mongodb')
const router = require('./routes')
const cookieParser = require('cookie-parser')

// initialize dotenv
dotenv.config()

// set our port
const port = process.env.PORT || 80

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${process.env.ORIGIN}`);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// register routes
app.use(router)

// start mongo connection pool, then start express app
mongo.connect(process.env.MONGODB_URL)
    .then(() => app.listen(port))
    .then(() => console.log(`Magic happens on port: ${port}`))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })