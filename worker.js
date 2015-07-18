var pp = require('podchoosee-parser');

module.exports = function(hoodie, done) {
  hoodie.task.on('feed:add', handleNewFeed);
  database = null;
  function handleNewFeed(originDb, feed) {
    database = originDb;
    pp.getSubscriptionPromise(feed)
      .done(function(response) {
        hoodie.database(originDb).add('feed',
            response,
            addFeedCallback);
      });
  }

  function addFeedCallback(error, message) {
    if(error){
        return hoodie.task.error(database, message, error);
    }
    return hoodie.task.success(database, message);
  };
  done();
};
