#SCRIPT TO OPEN FIBARO INTERCOM DOOR

This script starts a http server.
Each GET on / executes a script that opens one of the door connected to your Fibaro Intercom.

You must create a .env file with the following informations

    INTERCOM_IP = your_intercom_ip_address
    INTERCOM_USER = your_intercom_local_username
    INTERCOM_PASSWD = your_intercom_local_password

Since the script need th 'ws' and 'dotenv' packages, you must install theem :

    npm install --save dotenv
    npm install ws

To run the script :
`node openDoor.js`

Or with pm2
`pm2 start openDoor.js`
