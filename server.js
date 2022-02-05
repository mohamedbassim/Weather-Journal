// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

app.get('/all',callBack); // making a get method to respond with the projectData whenever making a request to it in the client-side code (app.js)

function callBack(request,response){
    response.send(projectData);
}

app.listen(port,function(){ // starting the server through the port number specified in the variable at the top
    console.log(`the server is up and running in the port ${port}`);
});

app.post('/weather',(req,res)=>{ // making a post method take the posted data from the post request and assign it to the project endpoint and then console logging it
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);
})

