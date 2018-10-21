const express = require('express');
const app = express();
const port = 3000;

var Client = require('node-rest-client').Client;

function syfApiSamples(){
	var client = new Client(); 
	var token = '';
	var args = {
	    data: { 
	    	client_secret: "OCK9OrG5BCDbOLQX", 
	    	client_id: "cUsuC3PAn7831pkI9hArnGN25XotFVN3",
	    	grant_type: "client_credentials" 
	    },
	    headers: { 
	    	"Content-Type": "application/x-www-form-urlencoded" ,
			"X-SYF-Request-TrackingId": "xSYFRequestTrackingId_example"
		}
	};
	 
	var req = client.post("https://api-stg.syf.com/oauth2/v1/token", args, function (data, response) {
	    token = data.access_token;
	    console.log("token: " + token);

		var args2 = {
		    headers: { 
		    	"Accept": "application/json" ,
		    	"Authorization": "Bearer " + token,
				"X-SYF-Request-TrackingId": "xSYFRequestTrackingId_example"
			}
		};
		var req2 = client.get('https://api-stg.syf.com/m2020/customers/1/profile', args2, function (data, response) {
		    // parsed response body as js object
			console.log("profile response " + JSON.stringify(data));
			console.log("total spend: " + data.totalSpend);
		});
		req2.on('requestTimeout', function (req2) {
			console.log('request has expired');
			req2.abort();
		});
		req2.on('responseTimeout', function (res2) {
			console.log('response has expired');
		});

		var args3 = {
		    data: { 
		    },
		    headers: { 
		    	"Accept": "application/json" ,
		    	"Authorization": "Bearer " + token,
				"X-SYF-Request-TrackingId": "xSYFRequestTrackingId_example"
			}
		};
		var req3 = client.get('https://api-stg.syf.com/m2020/credit/customers/1/profile', args3, function (data, response) {
		    // parsed response body as js object
			console.log("credit response " + JSON.stringify(data));
			console.log("syfCreditScore: " + data.syfCreditScore);
		});
		req3.on('requestTimeout', function (req2) {
			console.log('request has expired');
			req2.abort();
		});
		req3.on('responseTimeout', function (res2) {
			console.log('response has expired');
		});

		var args4 = {
		    data: { 
		    },
		    headers: { 
		    	"Accept": "application/json" ,
		    	"Authorization": "Bearer " + token,
				"X-SYF-Request-TrackingId": "xSYFRequestTrackingId_example"
			}
		};
		var req4 = client.get('https://api-stg.syf.com/m2020/credit/customers/2/transactions/3', args4, function (data, response) {
		    // parsed response body as js object
			console.log("customers/2/transactions/3 response " + JSON.stringify(data));
			console.log("itemType: " + data.itemType);
		});
		req4.on('requestTimeout', function (req3) {
			console.log('request has expired');
			req2.abort();
		});
		req4.on('responseTimeout', function (res3) {
			console.log('response has expired');
		});


	});
	req.on('requestTimeout', function (req) {
		console.log('request has expired');
		req.abort();
	});
	req.on('responseTimeout', function (res) {
		console.log('response has expired');

	});
	req.on('error', function (err) {
		console.log('request error', err);
	});

}

app.get('/', (req, res) => {
	syfApiSamples();
	res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
