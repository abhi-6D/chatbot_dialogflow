var express=require("express");
var app=express();
const { WebhookClient } = require("dialogflow-fulfillment");
const { welcome, defaultFallback, services,payload,option} = require("./connectchat");
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/dialogflow", express.json(), (req, res) => {
const agent = new WebhookClient({ request: req, response: res });
let intentMap = new Map();
intentMap.set("Default Fallback Intent", defaultFallback);
intentMap.set("Service", services);
intentMap.set("Payloads", payload);
intentMap.set("Options", option);
agent.handleRequest(intentMap);
});
app.listen(3000);