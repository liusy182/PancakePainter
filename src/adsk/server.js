'use strict';

var express = require('express');
var fetch = require('node-fetch');
var querystring = require('querystring')

// https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=YUgMLFFrbHWUfVu63r4BI8IxgImbR72W&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=data:read

var jwt = null;

module.exports = function () {
  var app = express();
  app.get('/callback', function(req, res) {
    res.send('callback\n');
    console.log(req.query['code'])

    var postData = {
      'client_id': 'YUgMLFFrbHWUfVu63r4BI8IxgImbR72W',
      'client_secret': 'td0En95lnkxGqARI',
      'grant_type': 'authorization_code',
      'code': req.query['code'],
      'redirect_uri': 'http://localhost:3000/callback'
    }

    // Configure the request
    var options = {
        hostname: 'developer.api.autodesk.com',
        path: '/authentication/v1/gettoken',
        port: 443,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    // Start the request
    var r = fetch('https://developer.api.autodesk.com/authentication/v1/gettoken', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: querystring.stringify(postData)
    }).then(res => res.json()).then(json => {
      jwt = json;
      console.log(json);
    });
  });

  app.get('/callback2', function(req, res) {
    res.send('callback2\n');
    console.log('callback2')
  });
  app.listen(3000);
}

