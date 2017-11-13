"use strict";

const mySwapi = require('../httpWorld/httpCommon').mySwapi;
const swapiBaseURL = require('../config/config').swapiBaseURL;

let fullResults = [];

// This is a generic Swapi GET using an Axios HTTP instance defined in httpCommpon
// All 'GETS' can be routed through getSwapi
let getSwapi = (resourceURL) => {
    return new Promise((resolve, reject) => {
        mySwapi.get(resourceURL)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

let getSwapiAllPages = (resource, pages) => {
    var promiseList = [];
    return new Promise((resolve, reject) => {
        for (var i = 2; i < pages + 1; i++) {
            var pr = new Promise(function (resolve, reject) {
                getSwapi(resource + '?page=' + i)
                    .then(response => {
                        fullResults = [...fullResults, ...response.results];
                        resolve(fullResults);
                    })
                    .catch((error) => {
                        reject(error); // 
                    });
            }); // end of promise
            // Add the promise to the promiseList - we will have a promise.all over this list.
            promiseList.push(pr);
        }
        resolve(promiseList);
    });
};


let getSwapiComplete = (resource) => {
    fullResults = [];
    var promiseList = [],
        pages = 0;

    return new Promise((resolve, reject) => {
        getSwapi(resource)
            .then(response => {
                fullResults = [...fullResults, ...response.results];
                if (response.count > 10) {
                    pages = response.count / 10;
                    getSwapiAllPages(resource, Math.ceil(pages))
                        .then(myPromiseList => {
                            Promise.all(myPromiseList).then(function (values) {
                                resolve(fullResults);
                            }) // end of .then on promise.all
                                .catch(function (error) {
                                    console.log('Ooopsy-Daisy !');
                                });
                        });
                }
            })
            .catch((error) => {
                console.log('Error retrieving inGetSwapiComplete for resource ' + resource);
                reject(error);
            });
    });
};



module.exports = {
    getSwapi: getSwapi,
    getSwapiComplete: getSwapiComplete
};
