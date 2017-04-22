const express = require('express')  
const app = express()  
const port = 1337
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, (err) => {
  console.log(`Justin's test is running on ${port}`)
})

// POST / 
// recieves a JSON object looks for a 2D array,
// parses it, and finds a minimum path
// General approach from http://www.codinghelmet.com/?path=exercises/minimum-weight-path-through-matrix

app.post('/', function(request, response){
  if(!request.body || !request.body.array){
    return response.send('Error: no array found in request body', 401)
  } 
  var arrayString = request.body.array
  var array = parse2DArray(arrayString)
  var pathArray = buildPathArray(array)
  var res = findMinPath(pathArray, array)
  return response.send({
    path: res[0],
    weight: res[1]
  });
})

// Takes a string containing a 2D JSON formatted array
// and parses it into a Javascript array
function parse2DArray(arrayString){
  var array = []
  arrayString = arrayString.substring(1, arrayString.length-2)
  arrayString.split("],").forEach(function(subArrayString, index){
    array[index] = []
    subArrayString = subArrayString.substring(1, subArrayString.length)
    subArrayString.split(",").forEach(function(element){
      array[index].push(parseInt(element))
    })
  })
  return array
}


// Takes a 2D array and finds the lowest possible weight
// at any given point for the lowest weight path it is in
function buildPathArray(array){
  var pathArray = [];
  array.forEach(function(rowArray, row){
    pathArray[row] = [];
    rowArray.forEach(function(element, column){
        if(row === 0){
        	pathArray[row][column] = element 
        } else{
            var canidateCol = column;
            if(column > 0 && pathArray[row-1][column-1] < pathArray[row-1][canidateCol]){
               canidateCol = column - 1;
            }
            if(column < rowArray.length-1 && pathArray[row-1][column+1] < pathArray[row-1][canidateCol]){
               canidateCol = column + 1;
            }
            pathArray[row][column] = pathArray[row - 1][canidateCol] + element;
        }
    });
  });
  return pathArray
}


// Parses a pathArray from the buildPathArray function
// and finds the lowest weighted path starting with the 
// final column on the last row
function findMinPath(pathArray, array){
    var path = []
    var column, weight
    var row = pathArray.length-1
    var weight
    pathArray[row].forEach(function(element, index){
        if(index === 0){
            weight = element
            column = index
        } else if(element < weight){
            weight = element
            column = index
        }
    });
    path.push(array[row][column]);
    for(row = pathArray.length-1;row > 0; row--){
        if(column > 0 &&
            pathArray[row-1][column-1] + array[row][column] === pathArray[row][column]){
            column = column-1
        } else if( column < pathArray[row].length-1 &&
            pathArray[row-1][column+1] + array[row][column] === pathArray[row][column] ){
            column = column+1
        }
        path.push(array[row-1][column]);
    }
    return [path.reverse(), weight];
}

