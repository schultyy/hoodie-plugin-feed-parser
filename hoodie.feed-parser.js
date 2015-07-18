Hoodie.extend(function(hoodie) {
  hoodie.feeds = {
    parse: hoodie.task('feed').start,
    on: hoodie.task('feed').on // maybe not needed
  };
});
