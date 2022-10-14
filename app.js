if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require('express');
const dbConfig = require('./db/config');
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login');
var methodOverride = require('method-override')
const profileRoutes = require('./routes/profile');
const registerRoutes = require('./routes/register');
const appointmentRoutes = require('./routes/appointments');
const { isAuthenticated } = require('./middlewares/isAuthenticated');
const ejsMate = require('ejs-mate');
const path = require('path')
const session = require('express-session');
const MongoStore = require("connect-mongo");
const app = express();
const dbUrl = process.env.DBURL || "mongodb://localhost:27017/nybula";     // FOR DEVELOPMENT MODE

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))

// const secret = process.env.SECRET;

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: dbUrl,
    dbName: 'nybula',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
  })
}));

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})
app.use('/register', registerRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/profile', profileRoutes);

app.use("*", (req, res) => {
  res.send("<h1>Page Not Found</h1>");
})
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server Started");
})