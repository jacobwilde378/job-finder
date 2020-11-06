const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const session = require('express-session');
const hbs = exphbs.create();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'boots&hat&boots&hats',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
})