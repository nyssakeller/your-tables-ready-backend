const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then( restaurants => {
      response.status(200).json(restaurants);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurants/:id/', (request, response) => {
  const { id } = request.params;

  database('restaurants').where('id', id)
    .then( restaurant => {
      response.status(200).json(restaurant);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurant_details', (request, response) => {
  database('restaurant_details').select()
    .then( restaurants => {
      response.status(200).json(restaurants);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurants/:id/restaurant_details', (request, response) => {
  const { id } = request.params;

  database('restaurant_details').where('restaurant_id', id)
    .then( details => {
      response.status(200).json(details);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/restaurant_details/:id/', (request, response) => {
  const { id } = request.params;

  database('restaurant_details').where('id', id)
    .then( restaurant => {
      response.status(200).json(restaurant);
    })
    .catch( error => {
      response.status(404).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Restaurant App is running on ${app.get('port')}.`);
});

module.exports = app;