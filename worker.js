module.exports = function(hoodie, done) {
  hoodie.task.on('feed:add', handleNewFeed);
  function handleNewFeed(originDb, feed) {
    hoodie.database(originDb).add('feed',
        address,
        addMessageCallback);
  }

  function addFeedCallback(error, message) {
    if(error){
        return hoodie.task.error(originDb, message, error);
    }
    return hoodie.task.success(originDb, message);
  };
  done();
};
