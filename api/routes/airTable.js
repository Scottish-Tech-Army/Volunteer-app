
require('dotenv').config()
const axios = require('axios').default;
const express = require('express');
const router = express.Router();

// import hidden variables, ID is the company ID
const apiKey = process.env.AIRTABLE_API_KEY;
const id = process.env.AIRTABLE_ID;

//setting the base URL to make it easy to add more
axios.defaults.baseURL = `https://api.airtable.com/v0/${id}/`


router.get("/event/:id", function (req, res, next) {
  // STA%20Events is the table name
  const url=`STA%20Events/${req.params.id}`
    axios(url, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${apiKey}`

      }
     
    })
    .then(response => {
      console.log(response);
        if(response.status >= 200 && response.status < 300){
          // extracts so only the needed data is returned
            return res.json(response.data);
          }
          return Promise.reject(new Error(response.statusText));
        })

    })

router.get ('/events/schedule/:schedule', function (req, res, next) { 
  axios('STA%20Events', {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  
  })
  .then (response => {
    const events = response.data.records
    const upComingEvents = []
    const pastEvents = []

    // setup dates for calculation
    const today = new Date()
    // const tomorrow = new Date(today)
    // tomorrow.setDate(tomorrow.getDate() + 1)

    if(response.status >= 200 && response.status < 300){
      if(req.params.schedule === 'past') {
        events.map((event) => {
          const eventDate = new Date(event.fields['Event Date'])
          if(eventDate < today){
            pastEvents.push(event)
          }
        })
        return res.status(200).json(pastEvents)
      } else if(req.params.schedule === 'scheduled'){
        events.map((event) => {
          const eventDate = new Date(event.fields['Event Date'])
          if(eventDate >= today){
            upComingEvents.push(event)
          }
        })
        return res.status(200).json(upComingEvents)
      } else {
        return res.status(404).json({'Error': 'Event not found'})
      }
    }
})
})

router.get("/events", function (req, res, next) {
  // STA%20Events is the table name
    axios('STA%20Events', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${apiKey}`

      }
     
    })
    .then(response => {
        if(response.status >= 200 && response.status < 300){
          // extracts so only the needed data is returned
            return res.json(response.data.records);
          }
          return Promise.reject(new Error(response.statusText));
        })

    })
  

module.exports = router;