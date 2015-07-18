module.exports = function(hoodie, done) {
  hoodie.task.on('feed:add', handleNewFeed);
  database = null;
  function handleNewFeed(originDb, feed) {
    database = originDb;
    hoodie.database(originDb).add('feed',
        feed,
        addFeedCallback);
  }

  function addFeedCallback(error, message) {
    if(error){
        return hoodie.task.error(database, message, error);
    }
    return hoodie.task.success(database, message);
  };
  done();
};
