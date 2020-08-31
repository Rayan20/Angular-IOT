const express = require('express');
var request = require('request');
const pool = require('./db');

global.clientIP = '1';
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

app.post('/api/add_data', (req, res) => {
    var message = req.body.monitor;
    const addData = {
        name: 'addWeather',
        text: 'INSERT INTO test.search(history) VALUES($1) RETURNING *',
        values: [message]
    };
    pool.connect((err, client, release) => {
        if (err) {
            console.log(err);
        }
        client.query(addData, (err, res) => {
            release();
            if (err) {
                console.error("error in addData " + err.stack);
            }
        })
    })
});

app.get('/api/query', (req, res) => {
    var search = [];
    const getData = {
        name: 'get10',
        text: 'SELECT * FROM test.search ORDER BY id DESC LIMIT 10'
    };
    pool.connect((err, client, release) => {
        release();
        if (err) {
            console.log(err);
            res.send("error");
        }
        client.query(getData, async (err, result) => {

            if (err) {
                return console.log(err);
            }

            for (let row in result.rows) {
                var history = result.rows[row];
                search.push(history);
            }

            console.log(search);

            return res.send({"data": search});

        })
    })
});

app.post('/api/user', (req, res) => {
    console.log("/api/user post got hit");
    monitor = req.body;
    var message = monitor.monitor;
    console.log(message);

    request.post({
        url: 'http://' + clientIP + ':8080/lcd_print',
        json: {
            message: message
        },
        timeout: 5000

    }, function (err, response) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Content-Type", "application/json");
        if (err) {
            console.log(err);
            if (err.code === 'EHOSTUNREACH') {
                return res.send({"message": "LCD may not be online"});
            } else {
                return res.send({"message": "LCD may not be online"});

            }
        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);
                console.log("status code=" + response.statusMessage);
                return res.send({"message": "LCD is updated"});

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
    console.log("Received IP is: " + clientIP);
});

