var { google } = require("googleapis")
const key = require('./serviceAccount.json');
const https = require('https');
// const conversation = require('./conversation.js');
// const utils = require('./utils.js')

exports.getDFResult = async function (session_id, phone, user_query) {
    console.log("\n this is the phone number", phone)
    let query = {
        query_input: {
            text: {
                text: user_query,
                language_code: 'en-US'
            }
        },
        query_params: {
            payload: {
                telephony: {
                    caller_id: phone.toString()
                }
            }
        }
    }

    let jwtClient = new google.auth.JWT(
        key.client_email, null, key.private_key,
        ['https://www.googleapis.com/auth/dialogflow'],
        null
    );
    let credentials = jwtClient.authorize();
    return credentials.then((cred) => {
        console.log(cred);
        return new Promise((resolve, reject) => {
            let options = {
                host: 'dialogflow.googleapis.com',
                path: '/v2/projects/' + key.project_id + '/agent/sessions/' + session_id + ':detectIntent',
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + cred.access_token
                }
            }
            var req = https.request(options, (res) => {
                let body = '';
                res.on('data', (d) => { body += d; });
                res.on('end', () => {
                    //console.log('--2');
                    console.log("=> DF response body: ", body);
                    var jsonBody = JSON.parse(body);
                    resolve(jsonBody.queryResult);
                });
                res.on('error', (error) => {
                    console.log(`Error calling dialogflow API: ${error}`)
                    reject(error);
                });
            });
            console.log("==> query ", JSON.stringify(query))
            req.write(JSON.stringify(query));
            req.end();
        });
    });
    // });

}

// function intentHandler(user, df_data, channel) {

//     console.log('user ', user);
//     let params = df_data.parameters
//     let query = df_data.queryText
//     let intent = df_data.intent.displayName

//     console.log("==> params: ", params);
//     console.log("==> query: ", query);
//     console.log("==> intent: " + intent + " : confidence_score: ", df_data.intentDetectionConfidence);

//     return new Promise(function (resolve, reject) {
//         conversation.handleMessage(user, intent, query, params, channel).then(value => {
//             console.log("msg : ", value);
//             // value is emty or not
//             if (utils.isEmpty(value)) {

//             } else {
//                 let string = value;
//                 if (value instanceof Array) {
//                     string = value.join(',');
//                 } else {
//                     value = [value]
//                 }
//             }
//             return resolve(value);

//         });
//     });
// }

// exports.getBotResponse = function (phone_number, session_id, query, channel) {
//     return new Promise((resolve, reject) => {
//         return exports.getDFResult(phone_number, session_id, query).then(function (result) {
//             //console.log(" result: ", result)
//             if (!utils.isEmpty(result.fulfillmentText)) {
//                 return resolve([result.fulfillmentText])
//             }
//             intentHandler({ uuid: phone_number, phone: session_id }, result, channel).then(fulfillmentMessages => {
//                 if (utils.isEmpty(fulfillmentMessages)) {
//                     console.info("fulfillmentMessages is empty. A problem with the bot?")
//                 }
//                 return resolve(fulfillmentMessages)
//             });
//         });
//     });
// }
