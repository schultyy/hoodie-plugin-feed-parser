Hoodie.extend(function(hoodie) {
  hoodie.feeds = {
    parse: hoodie.task('parse-feed').start,
    // on: hoodie.task('feed').on // maybe not needed
  };
});
