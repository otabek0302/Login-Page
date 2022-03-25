const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const { v4: uuidv4 } = require("uuid");
const session = require("express-session")

const router = require('./router')

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine", "ejs")

//load static assets
app.use('/static', express.static(path.join(__dirname, "public")))
app.use('/assets', express.static(path.join(__dirname, "public/assets")))

app.use(session({
     secret: uuidv4(),
     resave: false,
     saveUninitialized: true,
}));

app.use('/route', router);

// Home route   
app.get('/', (req, res) => {
     res.render('base', { title: "LOGIN SYSTEM" });
})

app.listen(port, () => {
     console.log(" Server has been created Successfully http://localhost:3000 ");
})