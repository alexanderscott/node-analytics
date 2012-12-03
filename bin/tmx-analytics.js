#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    forever = require('forever-monitor');

program
.command('start')
.description('Startup tmx-analytics server and bind to UDP port')
.action(function () {
    var child = new (forever.Monitor)(__dirname + '/../stats-server.js');
    
    child.start();
    console.log(__dirname, 'tmx-analytics server started');
});

program.parse(process.argv);

