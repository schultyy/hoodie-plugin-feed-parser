Hoodie.extend(function(hoodie) {
  hoodie.directMessages = {
    send: hoodie.task('parse-feed').add,
    on: hoodie.task('parse-feed').on // maybe not needed
  };
});
