if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express');
const dbConfig = require('./db/config');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const profileRoutes = require('./routes/profileRoutes')
const appointmentRoutes = require('./routes/appointments');
const { isAuthenticated } = require('./middlewares/isAuthenticated');
const ejsMate = require('ejs-mate');
const path = require('path')
const session = require('express-session');
const MongoStore = require("connect-mongo");
const app = express();
const dbUrl = "mongodb://localhost:27017/nybula";     // FOR DEVELOPMENT MODE

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// const secret = process.env.SECRET;

app.use(session({
  secret: "afdl;kkjlajflkfjlakj",
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: dbUrl,
    dbName: 'nybula',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
  })
}));

app.get('/', isAuthenticated, (req, res) => {
  res.status(201).render('index');
})
app.use('/login', loginRoutes);
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})
app.use('/register', registerRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/profile', profileRoutes)

app.use("*", (req, res) => {
  res.send("<h1>Page Not Found</h1>");
})
const port = 8000;
app.listen(port, () => {
  console.log("Server Started");
})