const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Hello World!');
});


app.listen(app.get('port'), () => {
  console.log('listening');
});