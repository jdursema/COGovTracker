const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

//get all candidates
app.get('/api/v1/candidates', (request, response) => {

  database('candidates').select()

  .then(candidates => {
    return response.status(200).json({
      candidates
    })
  })
  .catch(error => {
    return response.status(500).json({
      error
    })
  })
})


app.listen(app.get('port'), () => {
  console.log('listening');
});