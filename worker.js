var pp = require('podchoosee-parser');
var uuid = require('uuid');

function validateUrl(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(url)) {
    return false;
  } else {
    return true;
  }
}

function createFeed(feedResponse, originAddress) {
  console.log('title', feedResponse.subscription.title);
  return {
    id: uuid.v4(),
    address: originAddress,
    title: feedResponse.subscription.title
  };
}

module.exports = function(hoodie, done) {
  hoodie.task.on('parse-feed:add', handleNewFeed);
  database = null;
  function handleNewFeed(originDb, message) {
    database = originDb;
    if(!message) {
      return;
    }
    if(validateUrl(message.feed)) {
      console.log("attemp to fetch", message.feed);
      pp.getSubscriptionPromise(message.feed)
        .done(function(response) {
          hoodie.database(database).add('feed', createFeed(response, message.feed), addFeedCallback);
        });
    }
    else {
      console.log('invalid feed', message.feed);
    }
  }

  function addFeedCallback(error, message) {
    console.log('callback', database);
    console.log('callback', message);
    if(error){
      return hoodie.task.error(database, message, error);
    }
    return hoodie.task.success(database, message);
  };
  done();
};
