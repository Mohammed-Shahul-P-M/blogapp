const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session')

// importing routes 
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: 'keyst', cookie: { maxAge: 60000 * 60 }, resave: false, saveUninitialized: false }))
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

// use route 
app.use('/', indexRouter)
app.use('/admin', adminRouter)








app.listen(3000, function () {
  console.log("Server started on port 3000");
});
