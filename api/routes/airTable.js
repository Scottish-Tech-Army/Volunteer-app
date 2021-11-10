
require('dotenv').config()
const axios = require('axios').default;
const express = require('express');
const router = express.Router();

// import hidden variables, ID is the company ID
const apiKey = process.env.AIRTABLE_API_KEY;
const id = process.env.AIRTABLE_ID;

//setting the base URL to make it easy to add more
axios.defaults.baseURL = `https://api.airtable.com/v0/${id}/`



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