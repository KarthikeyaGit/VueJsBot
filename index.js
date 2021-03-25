'use strict';

const df = require('./df.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
// const { Card, Suggestion } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    agent.handleRequest(intentMap);
});

exports.web = functions.https.onRequest(async (req, res) => {

    console.log("==>web", req.body)
    let phone_number = req.body.phone_number
    let session_id = req.body.session_id
    let query = req.body.query
    let Result = await df.getDFResult(phone_number, session_id, query)

    console.log("In web df results", Result.fulfillmentText)
    res.send(Result)

})

app.use(cors());


app.use(express.static('./'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
app.post('/web', exports.web)

app.post('/', exports.dialogflowFirebaseFulfillment)

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});