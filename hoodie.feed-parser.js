Hoodie.extend(function(hoodie) {
  hoodie.feeds = {
    parse: hoodie.task('feed').add,
    on: hoodie.task('feed').on // maybe not needed
  };
});
