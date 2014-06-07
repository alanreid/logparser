
var Logparser = require('../logparser'),
    plugins = require('../plugins');


var logparser = new Logparser();

// Select a parser
logparser.use(plugins.apacheAccess);

// Event listener for every parsed line
logparser.on('item', function(item) {
  
});

// Parse log
var parsedLog = logparser.parse('apache/access.log');

// Get the object list of all parsed lines
parsedLog.done(function(parsedLog) {
  
});