
# Simple-Swapi-Test
## Installation
npm install

## Usage

- npm start

    - The application will provide how many stops for resupply are required for all SW star ships, to cover a given distance.  
    - The application takes as input a distance in mega lights (MGLT) - you will be prompted for this.  Please supply a numeric ONLY.
    - The number of stops is calculated based on the following formula: input distance (in MGLT) / starship MGLT / consumables in hours.
    - The output is a collection of all the star ships and the total amount of stops required to make the distance between the planets.

    Sample output for 1000000 input:
    Y-wing: 74
    Millennium Falcon: 9
    Rebel Transport: 11

- npm test
    - Some VERY basic testing is also performed by running the 'npm test' command


## Assumptions
- JSON encoders only. No Wookiee encoding considered yet. 
- Pages only contain 10 objects - big assumption but works for now.  Another solution would be to introduce an outer layer promise when retrieving all objects from a resource.  The outer promise would be resolved when a null value is encountered in the 'next' key.
- The number of hours in the various time units are as follows:
    - "day": 24
    - "week": 168
    - "month": 730.001
    - "year": 8760

## Requirements 
- NodeJS version 6 at the very least.  Older versions of node will not suffice as the promise-based http library Axios is heavily utilised.  Javascript promises require ECMAScript 6.  The application was developed using 6.11.3.

## Dependencies
(included in package.json so will be automatically included when you run npm install. Exception to this is SWAPI - just need this to run)
- swapi-co
    - The Star Wars API [`SWAPI`](https://swapi.co/)
- prompt
    - command line interface for NodeJS [`prompt`](https://github.com/SBoudrias/Inquirer.js) v 4.0.0
- axios
    - http client [`axios`](https://github.com/axios/axios) v0.17.0
- (Also mocha, chai and nock for testing purposes, although nock has not been implemented yet!)


## Additional Information
To include the library included in this project in a web-based solution, the project would need to be transpiled with a compiler like babel and polyfill. Babel would ensure most modern browsers would be supported i.e. support of a full ES2015+ environment.
