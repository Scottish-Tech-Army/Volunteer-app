const express = require('express');
const router = express.Router();

const API_KEY = process.env.API_KEY;

const apiKeyMiddleware = ((req, res, next) => {
    const apiKey = req.header("x-api-key");
  
   if (!apiKey || apiKey !== API_KEY) {
     return res.status(401).json({ message: "Unauthorized" });
   }

    next();
})

module.exports = {
    apiKeyAuthMiddleware: apiKeyMiddleware,
    apiKeyMiddleware
}