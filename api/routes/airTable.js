
require('dotenv').config()
const axios = require('axios').default;
const express = require('express');
const router = express.Router();


const apiKey = process.env.AIRTABLE_API_KEY;
const id = process.env.AIRTABLE_ID;
axios.defaults.baseURL = `https://api.airtable.com/v0/${id}/`



router.get("/events", function (req, res, next) {
    axios('STA%20Events', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${apiKey}`

      }
     
    })
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            return res.json(response.data.records);
          }
          return Promise.reject(new Error(response.statusText));
        })

    })
  

module.exports = router;