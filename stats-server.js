var fs = require('fs'),
    dgram = require('dgram'),
    async = require('async'),
    csv = require('csv'),
    _ = require('underscore'),
    Mixpanel = require('mixpanel'),
    bunyan = require('bunyan'),
    config = require('./config.json'),
    log = bunyan.createLogger({name: "node-analytics-proxy", level: config.loglevel });


// asynchronous and non-blocking thru event-emitting
var udpServer = dgram.createSocket("udp4");

udpServer.on("message", function (msgBuf, rinfo) {
    var msg = msgBuf.toString();
    
    var now = new Date();
    var dateAndTime = now.toUTCString();
    
    log.debug(dateAndTime + ": tmx-analytics received: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    
    async.parallel({
        csvLogger: function(callback){
            var jsonData = JSON.parse(msg.split("|")[2]) || {};
            var csvFields = _.values(jsonData).toString();
            var csvLog = csv()
                        .from(csvFields)
                        .to(config.csvLog, {flags: 'a', header: true})
                        .on('error', function(error){
                            fs.appendFileSync(config.errorLog, dateAndTime+': CSV LOGGING ERROR: '+error.message+'\n', encoding='utf8');
                            callback(null, false);
                        })
                        .on('close', function(){
                            callback(null, true);
                        });
            
        },
        
        mixPanelLogger: function(callback){
            var statData = msg.split(":")[0];
            var jsonData = JSON.parse(msg.split("|")[2]) || {};
            var mixpanel = Mixpanel.init(config.mixpanelKey);
            mixpanel.track(statData, jsonData, function(err) { 
                if (err){
                    fs.appendFileSync(config.errorLog, dateAndTime+': MIXPANEL LOGGING ERROR: '+err+'\n', encoding='utf8');
                    callback(null, false);
                } else {
                    callback(null, true);
                }
                
            });
        },
        
        statsdLogger: function(callback){
            var statsData = msg.substring(0,msg.lastIndexOf('|'));
            var msgBuffer = new Buffer(statsData);
            var statSender = dgram.createSocket("udp4");
            statSender.send(msgBuffer, 0, msgBuffer.length, config.statsdPort, config.statsdHost, function(err, bytes) {
                if (err) {
                    fs.appendFileSync(config.errorLog, dateAndTime+': STATSD LOGGING ERROR: '+err+'\n', encoding='utf8');
                    statSender.close();
                    callback(null, false);
                } else {
                    statSender.close();
                    callback(null, true);
                }
            });
        },
        
    },
    function(err, results){
        if(err){
            fs.appendFileSync(config.errorLog, dateAndTime+': ANALYTICS PROCESS ERROR: '+err+'\n', encoding='utf8');
        } else {
            // should output something along the lines of
            // {csvLogger: true, mixPanelLogger: true, statsdLogger: true}
            log.info("Processed stat: " + msg + " with results: ", resultes);
        }
    });
    
}).bind(config.port);