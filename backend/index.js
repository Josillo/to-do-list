require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port ||8080;
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

const db = require('./models');

db.sequelize.sync({ force: true }).then(() => { console.log( console.log('Drop and re-sync db')); });

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if(req.headers.authorization.indexOf('Basic ') === 0){
    // verify auth basic credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

require('./routes/task.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})