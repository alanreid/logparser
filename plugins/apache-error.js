
module.exports = function(line) {
    
  var item = {};

  var errorMatch = line.match(/^\[([^\]]+)\] \[([^\]]+)\] \[client ([^\]]+)\] (\S+)\: (.*)/);
  var phpMatch = line.match(/PHP (.*)\:  (.*) in (.*) on line ([0-9]{1,}), referer: (.*)$/);

  if(errorMatch !== null) {
    item.timestamp = new Date(errorMatch[1]);
    item.sender = errorMatch[4];
    item.message = errorMatch[5];
    item.type = 'apache-error';
  } else {
    return false;
  }

  if(phpMatch !== null && phpMatch.length == 6) {
    item.info = {
      client: errorMatch[3],
      level: phpMatch[1],
      message: phpMatch[2],
      file: phpMatch[3],
      line: phpMatch[4],
      url: phpMatch[5],
    }
  }

  return item;

};