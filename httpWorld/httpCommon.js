"use strict";

//
// Axios is a HTTP client, is promise-based and also allows requests to be intercepted. 
//
const swapiBaseURL = require('../config/config').swapiBaseURL;
const axios = require('axios');
// This mySwapi instance uses the axios http client to access the SwapiAPI.  
// Several APIs could be set up as instances like below and the baseURLs could be retrieved from the config file.
const mySwapi = axios.create({
    baseURL: swapiBaseURL, // this is the baseURL used to build up an endpoint URL
    method: 'get', // default   
    responseType: 'json' // this may need to change if Wookiee needs to be scoped at a later date
});

module.exports = {
    mySwapi: mySwapi
};

