
module.exports = function(line) {
    
  var item = {};

  var accessMatch = line.match(/^(\S+) \S+ \S+ \[([^\]]+)\] "([A-Z]+) \/(.*) [^"]*" (\d+) \d+ "([^"]*)" "([^"]*)"$/m);
  
  if(accessMatch !== null && accessMatch.length === 8) {
    
    var dateMatch = accessMatch[2].match(/^(\d+)\/(\S+)\/(\d+):(.*) .*$/);
    var date = dateMatch[2] + ' ' + dateMatch[1] + ' ' + dateMatch[3] + ' ' + dateMatch[4];

    item.timestamp = new Date(date);
    item.sender = 'apache';
    item.message = accessMatch.input;
    item.type = 'apache-access';
    item.info = {
      client: accessMatch[1], 
      method: accessMatch[3],
      url: accessMatch[4],
      responseCode: accessMatch[5],
      referer: accessMatch[6],
      userAgent: accessMatch[7]
    }
  } else {
    return false;
  }

  return item;
  
};