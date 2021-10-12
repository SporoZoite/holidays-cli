#!/usr/bin/env node

//le site qui explique les CLI tools
//https://medium.com/nexl-engineering/build-a-cli-tool-with-node-js-create-p5-boilerplate-d4bd43753ea5

//update package.json:
//{
//    "name": "create-p5-boilerplate",
//    "bin": "./index.js",
//    ...
//  }

function creaLigne (fete) {
    console.log('\x1b[32m',fete.date,'\x1b[37m',':','\x1b[93m', fete.name,'\x1b[37m','- aka -','\x1b[95m', fete.localName,'\x1b[37m');
}

function chargement () {
    console.log('getting Holydays');
    console.log(" _   _       _ _     _                 _");
    console.log("| | | | ___ | (_) __| | __ _ _   _ ___| |");
    console.log("| |_| |/ _ \\| | |/ _  |/ _  | | | / __| |");
    console.log("|  _  | (_) | | | (_| | (_| | |_| \\__ \\_|");
    console.log("|_| |_|\\___/|_|_|\\__,_|\\__,_|\\__, |___(_)");
    console.log("                             |___/");
}

function apiFete (pays){    
    chargement();
    const https = require('https');
    const date = new Date();
    const annee = date.getFullYear();
    const { getCode, getName } = require('country-list');
    const paysId =getCode(pays);
    const url = 'https://date.nager.at/api/v3/PublicHolidays/' + annee + '/'+ paysId;
    https.get( url , (resp) => {
        let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
     });


    // The whole response has been received. Print out the result.
    resp.on('end', () => {      
        const listAPI =JSON.parse(data);        
        console.log('\x1b[32m','✓','\x1b[37m','data fetched!');
        listAPI.forEach(fete =>  creaLigne(fete));   
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

//process.argv get the argument from the terminal
apiFete (process.argv[2]);