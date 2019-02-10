const express = require('express');
const bodyParser = require('body-parser');
const { getPathView } = require('./utils/path');
const sequelize = require('./utils/database');

const { get404 } = require('./controllers/error');
const adminRoutes = require('./routes/admin').router;
const shopRoutes = require('./routes/shop');

const app = express();
// Remove Headers by security
app.disable('x-powered-by');
// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Config
app.use(express.static(getPathView('', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

//Init database models, create tables
sequelize
  .sync()
  .then(result => {
    // console.log(result);
    // Listen
    app.listen(3000, () => console.log('Listening in PORT 3000'));
  })
  .catch(error => console.log('Init database error:', error));
