const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESS_SECRET, //secret is used to sign session ID cookie. This allows server to verify authenticity of the session ID.
  cookie: {},
  resave: false, //session will not be saved to session store on every request
  saveUninitialized: true, //uninitialized session will be saved to session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//Create the Handlebars.js engine object with custom helper functions.
const hbs = exphbs.create({ helpers });

//Inform Express.js which template engine will be used.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
