DiscourseEmbed = {
  discourseUrl: "http://localhost:4200/",
  discourseEmbedUrl: "http://localhost:3003",
};

(function () {
  var d = document.createElement("script");
  d.type = "text/javascript";
  d.async = true;
  d.src = DiscourseEmbed.discourseUrl + "javascripts/embed.js";
  (
    document.getElementsByTagName("head")[0] ||
    document.getElementsByTagName("body")[0]
  ).appendChild(d);
})();
