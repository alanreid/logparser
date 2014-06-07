
var Q = require('q'),
    fs = require('fs'),
    readline = require('readline'),
    Stream = require('stream'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');


var Logparser = function() {
  this.parser = {};
  EventEmitter.call(this);
};

util.inherits(Logparser, EventEmitter);

Logparser.prototype.use = function(selectedParser) {
  this.parser = selectedParser;
  return this;
};

Logparser.prototype.parse = function(file) {

  var deferred = Q.defer();
  var that = this;

  if(this.parser === undefined) {
    deferred.reject([]);
    return deferred.promise;
  }

  var rl = readline.createInterface(fs.createReadStream(file), new Stream());

  var list = [];

  rl.on('line', function(line) {
    var parsedLine = that.parser(line);

    if(parsedLine) {
      list.push(parsedLine);
      that.emit('item', parsedLine);
    }
  });

  rl.on('close', function() {
    deferred.resolve(list);
  });

  return deferred.promise;
};

module.exports = Logparser;