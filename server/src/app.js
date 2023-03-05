const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const electionName = require('./models/electionName');
const admin = require('./models/admin')
const pancards = require('./models/pancards')
const md5 = require('md5');
const e = require('cors');
require('./db/mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', function(req, res) {
    res.json('Works!');
});

app.get('/api/electionName', function(req, res) {
    var electionNames = []
    var electionOrganizers = []
    var electionIds = []
    var election_pass = []
    var final = []
    var accountaddress=[]
    electionName.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++){
            electionNames[i] = eachOne[i].election_name ;
            electionOrganizers[i] = eachOne[i].election_organizer;
            electionIds[i] = eachOne[i].election_id;
            election_pass[i] = eachOne[i].election_password;
            accountaddress[i]= eachOne[i].accountaddress;
            final.push({
                'election_id': eachOne[i].election_id,
                'election_organizer': eachOne[i].election_organizer,
                'election_name': eachOne[i].election_name,
                'election_pass': eachOne[i].election_password,
                'accountaddress':eachOne[i].accountaddress,
            })
        }
        res.send(final);
    })
})

app.post('/api/electionName', async function(req, res) {
    electionName.create({
        election_id: Math.floor(Math.random() * 100),
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: req.body.election_password,
        accountaddress: req.body.accountaddress
    }).then(election => {
        res.json(election);
    });
});


app.post('/api/userdetails', async function(req, res) {
    admin.create({
        username: req.body.username,
        password : req.body.password
    }).then(user => {
        res.json(user);
    });
});


app.get('/api/pandetails', function(req, res) {
    console.log(req.body.pan);
     pancards.find({}).then(eachOne => {
        res.send(eachOne);
    })
   
    // var electionNames = []
    // var electionOrganizers = []
    // var electionIds = []
    // var election_pass = []
    // var final = []
    // electionName.find({}).then(eachOne => {
    //     for (i = 0; i < eachOne.length; i++){
    //         electionNames[i] = eachOne[i].election_name ;
    //         electionOrganizers[i] = eachOne[i].election_organizer;
    //         electionIds[i] = eachOne[i].election_id;
    //         election_pass[i] = eachOne[i].election_password;
    //         final.push({
    //             'election_id': eachOne[i].election_id,
    //             'election_organizer': eachOne[i].election_organizer,
    //             'election_name': eachOne[i].election_name,
    //             'election_pass': eachOne[i].election_password
    //         })
    //     }
    //     res.send(final);
    // })
})


app.post('/api/adminLogin', async function(req, res) {
    admin.findOne({
        username: req.body.username,
        password: md5(req.body.password),
    }).then(election => {
        if(election === null){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});