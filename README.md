#SCRIPT TO OPEN FIBARO INTERCOM DOOR

This script starts a http server.
Each GET on / executes a script that opens one of the door connected to your Fibaro Intercom.

You must create a .env file with the following informations

    INTERCOM_IP = your_intercom_ip_address
    INTERCOM_USER = your_intercom_local_username
    INTERCOM_PASSWD = your_intercom_local_password

Since the script need th 'ws' and 'dotenv' packages, you must install theem :

    yarn install --save dotenv
    yarn install ws

to compile with flow just run yarn :
`yarn`

To run the script :
`node lib/openDoor.js`

Or with pm2
`pm2 start lib/openDoor.js`
