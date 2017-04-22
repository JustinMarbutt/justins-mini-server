# Justin Marbutt's Mini Path Solution

For this problem, I implement a simple API server in Node.js using the Express framework to minimize boilerplate code. If you don't have Node.js or NPM installed you can find instructions [here](https://nodejs.org/en/download/package-manager/). The main purpose of this server is to find the weight of the minimum weight path through the matrix for arbitrary input matrices. To better understand the problem I used the following article http://www.codinghelmet.com/?path=exercises/minimum-weight-path-through-matrix

When the server receives a POST request to the root url / with a JSON encoded body with a key of "array" containing a 2D array of integers (ie {"array" : "[[3,1,4],[1,5,9],[2,6,5]]"}), it will respond with the weight of the minimum weight path, as well as that path, through the matrix.

## Instructions

### Running Server
    - npm install
    - npm start

### Testing
    POST localhost:1337
        { "array" : "[[3,1,4],[1,5,9],[2,6,5]]" }
