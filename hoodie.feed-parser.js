Hoodie.extend(function(hoodie) {
  hoodie.parseFeed = {
    send: hoodie.task('feed').add,
    on: hoodie.task('feed').on // maybe not needed
  };
});
