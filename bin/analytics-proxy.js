#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    bunyan = require('bunyan'),
    config = require('../config.json'),
    log = bunyan.createLogger({name: "node-analytics-proxy", level: config.loglevel }),
    forever = require('forever-monitor');

program
.command('start')
.description('Startup tmx-analytics server and bind to UDP port')
.action(function () {
    var child = new (forever.Monitor)(__dirname + '/../stats-server.js');
    
    child.start();
    log.info(__dirname, 'analytics-proxy server started');
});

program.parse(process.argv);

