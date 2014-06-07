
module.exports = function(line) {
    
  var item = {};

  var basicMatch  = line.match(/\[(.*)\] ([a-zA-Z]{1,}\.[a-zA-Z]{1,})\: (.*) \[.*\] \[.*\]$/);
  var eventNotificationMatch = line.match(/Notified event \"([a-zA-Z]{1,}\.[a-zA-Z]{1,})\" to listener \"(.*)\". \[.*\] \[.*\]$/);
  var eventMatch = line.match(/Listener \"(.*)\"(.*) \"([a-zA-Z]{1,}\.[a-zA-Z]{1,})\". \[.*\] \[.*\]$/);
  var doctrineMatch = line.match(/doctrine\.[a-zA-Z]{1,}\: (.*) \[.*\] \[.*\]$/);
  
  if(basicMatch !== null) {
    item.timestamp = new Date(basicMatch[1]);
    item.sender = basicMatch[2];
    item.message = basicMatch[3];
    item.type = 'symfony';
  } else {
    return false;
  }

  if(eventNotificationMatch !== null && eventNotificationMatch.length === 3) {
    item.info = {
      event: eventNotificationMatch[1],
      listener: eventNotificationMatch[2]
    };
  }

  if(eventMatch !== null && eventMatch.length === 4) {
    item.info = {
      event: eventMatch[3],
      listener: eventMatch[1]
    };
  }

  if(doctrineMatch !== null && doctrineMatch.length === 3) {
    item.info = {
      data: doctrineMatch[2]
    };
  }

  return item;

};