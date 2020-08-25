const express = require('express');
var request = require('request');
var clientIP = 1;
var monitor;
const app = express(),
    bodyParser = require("body-parser");
port = process.env.PORT || 3000;

const users = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/my-app/dist/angular-nodejs-example/"));

app.get('/api/users', (req, res) => {
    console.log("/api/user get invoked");
    res.json(users);
});

app.post('/api/user', (req, res) => {
    console.log("/api/user post got hit");
    monitor = req.body;
    var message = monitor.monitor;
    console.log(message);

    request.post({
        url: 'http:// ' + clientIP + ':8080/lcd_print',
        json: {
            message: message
        },
        timeout: 5000

    }, function (err, response) {

        if (err) {
            console.log(err);
            if (err.code === 'EHOSTUNREACH') {
                return res.send("500");
            } else {
                return res.send("500");

            }
        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);
                console.log("status code=" + response.statusMessage);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.get('/api/led_control/client_ip/:ip', (req, res) => {
    var ip = req.params.ip;
    clientIP = ip;
    res.send(200);
    console.log("Received IP is: " + ip);
});

