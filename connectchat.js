var issue={"1":"Exchange","2":"Money Return"}
const { Payload } =require("dialogflow-fulfillment");
var randomstring = require("randomstring");
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbName='kmit_services';
let db
var username="";
var phno="";
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err);
        db=client.db(dbName);
        console.log(`Connected Database:${url}`);
        console.log(`Database :${dbName}`);
    });
async function defaultFallback(agent) {
    agent.add('Sorry! I am unable to understand this at the moment. I am still learning.');
    }
async function services(agent){
    phno=agent.parameters['phone-number'];
    console.log(phno);
    const data=await db.collection("customers").findOne({"phno":phno});
    console.log(data);
    if(data!=null){
       username=data['name'];
       console.log(username);
       agent.add("your username is : "+" "+username+". Kindly reply with a yes for confirmation.");
    }
   else{
       agent.add("please enter a valid phone no or if you're not registered to sevices please contact 123456");
    }
}

async function payload(agent){
    console.log("payload has been entered");
    agent.add("1: Slow Internet"+" "+"2:Network Issue");
}
async function option(agent){
    console.log("option entered");
    const option=agent.parameters['number'];
    var status="pending";
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    var time_date=year + "-" + month + "-" + date;
    var trouble_ticket=randomstring.generate(7);
    var myobj = {"phno":phno,"query":issue[option],"status":status,"time_date":time_date,"trouble_ticket":trouble_ticket };
    await db.collection("queries").insertOne(myobj, function(err, res) {
    if (err) throw err;
    //db.close();    
  });
  agent.add("your complaint has been registered under the ticket number "+" "+trouble_ticket+". Thank you for contacting us. Have a nice day :)");
}
module.exports = { defaultFallback: defaultFallback,services: services,payload: payload,option:option};