const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port ||8080;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded());

const db = require('./models');

db.sequelize.sync({ force: true }).then(() => { console.log( console.log('Drop and re-sync db')); });

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

require('./routes/task.routes')(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})