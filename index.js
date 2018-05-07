
var express = require("express");
const app = express()

const fileUpload = require('express-fileupload');
var cors = require('cors');
var bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(fileUpload());

var MyNetwork = require('./lib/MyNetwork');

app.post('/api/login', function (req, res) {
    MyNetwork.importCardToNetwork(req.files.card.data).then(function(idCardName) {
        if (!idCardName) {
            res.status(403).json({message: "Logging failed"});
        }
        res.json({message: "Logging Successful", accessToken: idCardName})    
    }).catch(function (error) {
        res.status(403).json({message: "Login failed", error: error.toString()})    
    })
})

app.post('/api/ping', function (req, res) {
    var cardName = req.headers.authorization;
    var mynetwork = new MyNetwork(cardName);

    mynetwork.init().then(function () {
        return mynetwork.ping()
    }).then(function (userInfo) {
        res.json({ user: userInfo })
    }).catch(function (error) {
        res.status(500).json({error: error.toString()})    
    })
})

app.post('/api/logout', function (req, res) {
    var cardName = req.headers.authorization;
    var mynetwork = new MyNetwork(cardName);

    mynetwork.init().then(function () {
        return mynetwork.logout()
    }).then(function () { 
        res.json({ message: "User added Successfully" });
    }).catch(function(error) {
        console.log(error);
        res.status(500).json({ error: error.toString() })
    })
})

app.get('/', (req, res) => res.send('Hello'))

app.listen(8080, () => console.log('Hello'))