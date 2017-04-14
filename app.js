/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var handlebars = require('handlebars');
var fs = require('fs');

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
app.get('/how', function (req, res) {
  //res.send('Hello World!');

	// get your data into a variable
	var fooJson = require('/doc.json');

	// read the file and use the callback to render
	fs.readFile('/how.html', function(err, data){
  	if (!err) {
    	// make the buffer into a string
    	var source = data.toString();
    	// call the render function
    	res.send(renderToString(source, fooJson));
  	} else {
    	// handle file read error
  	}
});

// this will be called after the file is read
function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}
  
})
