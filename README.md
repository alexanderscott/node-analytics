node-analytics-proxy
====================
Analytics server which listens for stats data and forwards to various analytics platforms.
Accepts stats of the form `$stat:$value` where `$value` is `$delta|$metric|$json`
    - ex/ `testing.user.session_start:1|c|{"user_id":1}`

Purpose
--------------------
- listen for UDP packets
- output buffer JSON data to CSV
- send stats to Mixpanel with JSON data as properties
- send stats to statsd server with graphite back-end

    
Install & Configure
--------------------
```
npm install
```
Edit `config.json` with backend analytics engine & host/port settings.
    
Run
--------------------
```
npm start
```

To keep-alive with forever-monitor: 
```
node bin/analytics-proxy.js start
```
    

Test
--------------------
- Install netcat via package manager and echo stats to the running process: 
```
echo -n 'prod.social.artist.share:1|c|{"user_id":1}' | nc -w 1 -u HOST PORT
```

    
Links
--------------------
- [statsd](https://github.com/etsy/statsd)
- [graphite](http://graphite.wikidot.com/)
- [mixpanel-node](https://github.com/carlsverre/mixpanel-node)
- [node-csv-parser](https://github.com/wdavidw/node-csv-parser)
- [node-dgram](http://nodejs.org/api/dgram.html)


License
------------------
MIT
