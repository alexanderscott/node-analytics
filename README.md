TMX-NODE-ANALYTICS
====================

Description
--------------------
Analytics server which listens for stats data and forwards to various analytics platforms.
Accepts stats of the form $stat:$value where $value is $delta|$metric|$json
    - ex/ `testing.user.session_start:1|c|{"user_id":1}`

Purpose
--------------------
- listen for UDP packets
- output buffer JSON data to CSV
- send stats to Mixpanel with JSON data as properties
- send stats to statsd server with graphite back-end
    
Install & Configure
--------------------
1. clone the repo
2. $ npm install
3. edit config.json file in project root (`$ vim ./config.json`) and input host/port settings 
    
Run
--------------------
- cd into project root
- to keep-alive with forever-monitor: `$ node bin/tmx-analytics start`
- to run ad-hoc: `$ node stats-server`
    
Test
--------------------
- install netcat (`$ brew install netcat` on a mac)
- run the following in terminal, replacing HOST and PORT of analytics server: 
    `$ echo -n 'prod.social.artist.share:1|c|{"user_id":1}' | nc -w 1 -u HOST PORT`
    
Links
--------------------
- [statsd](https://github.com/etsy/statsd)
- [graphite](http://graphite.wikidot.com/)
- [mixpanel-node](https://github.com/carlsverre/mixpanel-node)
- [node-csv-parser](https://github.com/wdavidw/node-csv-parser)
- [node-dgram](http://nodejs.org/api/dgram.html)
