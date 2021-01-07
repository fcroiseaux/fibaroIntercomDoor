// @flow

const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const HOSTNAME = 'localhost';
const PORT = 3000;
const INTERCOM_IP: string = ((process.env.INTERCOM_IP: any): string);
const INTERCOM_USER: string = ((process.env.INTERCOM_USER: any): string);
const INTERCOM_PASSWORD: string = ((process.env.INTERCOM_PASSWD: any): string);
let GLOBAL_TOKEN = '';

const myFibaroWS = 'wss://' + INTERCOM_IP + ':8081/wsock';

const server = http.createServer((req, res) => {
    openPortail();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('OK');
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

function openPortail() {
    // Create new WebSocket client by passing "wss://IntercomIP:8081/wsock"
    const ws = new WebSocket(myFibaroWS);

    ws.onerror = function (err) {
        console.log('Connection Error ' + err.message);
    };

    // Assign function to be executed when connection is opened
    ws.onopen = function () {
        // Web Socket is connected, send data using send()

        // Prepare object with data to send
        const jsonrpc = {
            "jsonrpc": "2.0",
            // Method name
            "method": "com.fibaro.intercom.account.login",
            // Parameters
            "params": {
                // Username for local account
                "user": INTERCOM_USER,
                // Password for local account
                "pass": INTERCOM_PASSWORD
            },
            "id": "1"
        };

        // Parse data object to string
        const string_request = JSON.stringify(jsonrpc);

        // Send the strigified object
        ws.send(string_request);
        console.log('Connect command sent');
    };

    // Assign function to be executed when message is received
    ws.onmessage = function (evt) {
        //Extract data from response
        const received_msg = evt.data;
        console.log("Message is received..." + received_msg);
        // Parse response data, then save token to some global variable or pass to following API call in different way
        const json = JSON.parse(received_msg);
        GLOBAL_TOKEN = json.result.token;
        ws.close();
        WebSocketOpenFirstRelay(GLOBAL_TOKEN)

    };

    // Assign function to be executed when connection is closed
    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };

}

function WebSocketOpenFirstRelay(token) {
    // Create new WebSocket client by passing "wss://IntercomIP:8081/wsock"
    const ws = new WebSocket(myFibaroWS);

    ws.onerror = function (err) {
        console.log('Connection Error ' + err.message);
    };

    // Assign function to be executed when connection is opened
    ws.onopen = function () {
        // Web Socket is connected, send data using send()

        // Prepare object with data to send
        const jsonrpc = {
            "jsonrpc": "2.0",
            // Method name
            "method": "com.fibaro.intercom.relay.open",
            // Parameters
            "params": {
                // Token received as a result of "com.fibaro.intercom.account.login" request
                "token": token,
                // ID of relay to be opened
                "relay": 0
            },
            "id": "1"
        };

        // Parse data object to string
        const string_request = JSON.stringify(jsonrpc);

        // Send the strigified object
        ws.send(string_request);
    };

    // Assign function to be executed when connection is closed
    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection is closed...");
    };

    // Assign function to be executed when message is received
    ws.onmessage = function (evt) {
        //Extract data from response
        const received_msg = evt.data;
        console.log("Message is received..." + received_msg);
        ws.close();
    };

}

