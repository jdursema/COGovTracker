
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  response.send('Hello World!');
});


const secretKey = process.env.BYOB_SECRET_KEY;

console.log(secretKey)

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


// get all contributions or contributions with a query paramater of zip

app.get('/api/v1/contributions', (request, response) => {
 const zip = (request.query.zip)
 const committeeId = (request.query.committeeId)
 if(zip) {
   database('contributors').where('donor_zip', zip).select()
   .then(contributors => {
    if(contributors.length){
      return response.status(200).json({
        contributors
      })
    } else {
      return response.status(404).json({
        error: `Could not find contributors for candadite with zip code of ${zip}`
      })
    }
  })
  .catch(error => {
    return response.status(500).json({
      error
    })
  })
 } else {
  database('contributors').select()
    .then(contributors => {
      if(contributors.length) {
        return response.status(200).json({contributors})
      } else {
        return response.status(404).json({error: "could not find contributors"})
      }
    })
    .catch(error => {
      return response.status(500).json({error})
    })
  }
})




app.get('/api/v1/candidates/:committeeId/contributors', (request, response) => {

  database('contributors').where('committee_id', request.params.committeeId).select()

  .then(contributors => {
    if(contributors.length){
      return response.status(200).json({
        contributors
      })
    } else {
      return response.status(404).json({
        error: `Could not find contributors for candadite with commmitte id of ${request.params.committeeId}`
      })
    }
  })
  .catch(error => {
    return response.status(500).json({
      error
    })
  })
})



app.post('/api/v1/candidates', (request, response) => {
  
  const candidate = request.body

  for(let requiredParameter of ['committee_id', 'last_name', 'full_name', 'candidate_id', 'committee_name', 'party', 'active']){

    if(!candidate[requiredParameter]){

      return response.status(422).json({
        error: `You are missing the required parameter ${requiredParameter}`
      })
    }
  }
  database('candidates').insert(candidate, 'id')
  .then(candidate => {
    return response.status(201).json({
      id: candidate[0]
    })
  })

  .catch( error => {
    return response.status(500).json({
      error
    })
  })
})


// post contributions
app.post('/api/v1/contributions', (request, response) => {
  const contribution = request.body
  for (let requiredParameter of ['committee_id', 
            'contribution_amount', 
            'contribution_date',
            'donor_last',
            'donor_first',
            'donor_address',
            'donor_city',
            'donor_state',
            'donor_zip',
            'record_id',
            'committee_type',
            'Jurisdiction']) {
    if(!contribution[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the required parameter ${requiredParameter}`
      })
    }
  }
   database('contributors').insert(contribution, 'id')
  .then(contribution => {
    return response.status(201).json({
      id: contribution[0]
    })
  })

  .catch( error => {
    return response.status(500).json({
      error
    })
  })
})


app.patch('/api/v1/candidate/:committeeId', (request, response) => {
  database('candidates').where('committee_id', request.params.committeeId).update(request.body, '')
  .then(update => {
    if(!update){
      return response.sendStatus(404).json({
        error: 'Could not update candidate'
      })
    } else {
      response.sendStatus(202)
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})


app.patch('/api/v1/contributions/:contributionId', (request, response) => {
  database('contributors').where('id', request.params.contributionId).update(request.body, '')
  .then(update => {
    if(!update) {
      return response.sendStatus(404).json({
        error: 'Could not update contribution'
      })
    } else {
      response.sendStatus(202)
    }
  })
  .catch(error => {
    response.status(500).json({error})
  })
})


app.delete('/api/v1/candidates/:committeId', (request, response) => {
  database('contributors').where('committee_id', request.params.committeId).delete()

  .then(() => {
    database('candidates').where('committee_id', request.params.committeId).delete()
      .then(candidate => {
      return response.sendStatus(202)
      })
      .catch(error => {
      return response.status(500).json({
        error
      })
  })

  
  
  })
})


app.delete('/api/v1/contributions/:contributionId', (request, response) => {
  database('contributors').where('id', request.params.contributionId).delete()
  .then(contribution => {
    return response.sendStatus(202)
  })
  .catch(error => {
    return response.status(500).json({error})
  })
})

app.listen(app.get('port'), () => {
  console.log('listening');
});


module.exports = app

