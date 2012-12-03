# TMX-NODE-ANALYTICS #

Description:
Analytics server which listens for stats data and forwards to various analytics platforms.
Accepts stats of the form $stat:$value where $value is $delta|$metric|$json
    - ex/ testing.user.session_start:1|c|{"user_id":1}

Purpose:
    - listen for UDP packets
    - output buffer JSON data to CSV
    - send stats to Mixpanel with JSON data as properties
    - send stats to statsd server with graphite back-end
    
To install & configure:
    - clone the repo
    - $ npm install
    - edit config.json file in project root ($ vim ./config.json) and input host/port settings 
    
To run:
    - cd into project root
    - to keep-alive with forever-monitor: $ node bin/tmx-analytics start
    - to run ad-hoc: $ node stats-server
    
To test:
    - install netcat
    - run the following in terminal, replacing HOST and PORT of analytics server: 
        $ echo -n 'prod.social.artist.share:1|c|{"user_id":1}' | nc -w 1 -u HOST PORT
    
Links:
    - https://github.com/etsy/statsd
    - http://graphite.wikidot.com/
    - https://github.com/carlsverre/mixpanel-node
    - https://github.com/wdavidw/node-csv-parser
    - https://github.com/nodejitsu/forever
    - http://nodejs.org/api/dgram.html
