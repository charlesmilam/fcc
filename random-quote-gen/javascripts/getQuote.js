function getQuote() {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies",
    type: "Post",
    data: {},
    datatype: 'json',
    success: function(data) {
      var quoteText = JSON.parse(data);
      console.log(data);
      if (quoteText.category === "Movies") {
        $(".quote-text").text('"' + quoteText.quote + '"');
        $(".movie").text("- " + quoteText.author);
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
