function getQuote() {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies",
    type: "Post",
    data: {},
    datatype: 'json',
    success: function(data) {
      var quoteText = JSON.parse(data);
      var quoteTag = $(".quote-text");
      var movieTag = $(".movie");
      var tweetTag = $(".tweet");

      console.log(data);
      if (quoteText.category === "Movies") {
        quoteTag.fadeOut("slow", function(){
          quoteTag.text('"' + quoteText.quote + '"').fadeIn("slow");
        });
        movieTag.fadeOut("slow", function(){
          movieTag.text("- " + quoteText.author).fadeIn("slow");
        });
        tweetTag.css("opacity", 1);
        tweetTag.fadeIn(3500);
      }
      else {
        getQuote();
      }
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "VeyXpOktQ4msh7cDFWQegB1gND0np1YHmmojsn0xKuqBTg6DAb");
    }
  });
}
