var resultStart = 0;
var resultEnd = 10;

$(".find-button").on("click", function () {
  $(`.next-pages-div`).css({ display: "none" });
  $(`footer`).css({ display: "none" });
  $(`.middle-div`).text("");
  $(".first-page").css({
    display: "none",
  });
  $(".second-page").css({
    display: "block",
  });
  var inpValue = $("input").val();
  $(".input-2").attr("value", `${inpValue}`);
  var inp2Value = $(".input-2").val();
  setTimeout(function () {
    $(`.next-pages-div`).css({ display: "block" });
    $(`footer`).css({ display: "flex" });
  }, 2000);
  $.ajax(
    `https://newsapi.org/v2/everything?q=${inp2Value}&from=2024&sortBy=publishedAt&apiKey=73bb5cfb6b6440499f44f4b4630c7d44`
  )
    .then(function (res) {
      $(`.result-number`).text(
        `Approximately ${res.totalResults} results found `
      );
      function doIt() {
        for (let i = resultStart; i < resultEnd; i++) {
          var sourceName = $(`<h5>`).text(res.articles[i].source.name);
          var newsTitle = $(
            `<h2><a target="_blank" href="${res.articles[i].url}">${res.articles[i].title}</a></h2>`
          );
          var newsDescription = $(`<p>`).text(res.articles[i].description);
          var newsPublishTime = $(
            `<p>Published at: ${res.articles[i].publishedAt}</p>`
          );
          var newsText = $(`<div class="news-text">`).append(
            sourceName,
            newsTitle,
            newsDescription,
            newsPublishTime
          );
          if (res.articles[i].urlToImage != null) {
            var newsImage = $(
              `<img class="news-image" src=${res.articles[i].urlToImage} />`
            );
          }
          var newsDiv = $(`<div class="news-div">`).append(newsText, newsImage);
          $(`.middle-div`).append(newsDiv);
        }
      }
      doIt();

      $(`.number-1`).on("click", function () {
        resultStart = 0;
        resultEnd = 10;
        $(`.middle-div`).text("");
        doIt();
      });
      $(`.number-2`).on("click", function () {
        resultStart = 10;
        resultEnd = 20;
        $(`.middle-div`).text("");
        doIt();
      });
      $(`.number-3`).on("click", function () {
        resultStart = 20;
        resultEnd = 30;
        $(`.middle-div`).text("");
        doIt();
      });
      $(`.number-4`).on("click", function () {
        resultStart = 30;
        resultEnd = 40;
        $(`.middle-div`).text("");
        doIt();
      });
      $(`.number-5`).on("click", function () {
        resultStart = 40;
        resultEnd = 50;
        $(`.middle-div`).text("");
        doIt();
      });
      $(".news").on("click", function () {
        $(".second-page-main").css({
          display: "block",
        });
        $(".images-page").css({
          display: "none",
        });
        $(".movies-page").css({
          display: "none",
        });
        $(".gifs-page").css({
          display: "none",
        });
      });
      $(".images").on("click", function () {
        $(`.images-page`).text("");
        $(".second-page-main").css({
          display: "none",
        });
        $(".images-page").css({
          display: "flex",
        });
        $(".movies-page").css({
          display: "none",
        });
        $(".gifs-page").css({
          display: "none",
        });
        $.ajax(
          `https://newsapi.org/v2/everything?q=${inp2Value}&from=2024&sortBy=publishedAt&apiKey=73bb5cfb6b6440499f44f4b4630c7d44`
        ).then(function (res) {
          for (let j = 0; j < 30; j++) {
            if (res.articles[j].urlToImage != null) {
              var images = $(
                `<a target="_blank" href="${res.articles[j].urlToImage}"><img class="images-page-image" src=${res.articles[j].urlToImage} /></a>`
              );
              var author = $(`<p>${res.articles[j].author}</p>`);
              var imagesDiv = $(`<div class="images-div"></div>`);
              $(imagesDiv).append(images, author);
              $(`.images-page`).append(imagesDiv);
            }
          }
        });
      });
      $(".gifs").on("click", function () {
        $(`.gifs-page`).text("");
        $(".images-page").css({
          display: "none",
        });
        $(".second-page-main").css({
          display: "none",
        });
        $(".movies-page").css({
          display: "none",
        });
        $(".gifs-page").css({
          display: "flex",
        });
        $.ajax(
          `https://api.giphy.com/v1/gifs/search?api_key=gxlPs0kCXI0sDmXoZM96x5qS8YANt3I8&q=${inp2Value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        ).then(function (res) {
          for (let m = 0; m < res.data.length; m++) {
            var gifs = $(
              `<a target="_blank" href="${res.data[m].images.fixed_height.url}"><img src=${res.data[m].images.fixed_height.url} /></a>`
            );
            $(".gifs-page").append(gifs);
          }
        });
      });
      $(".movies").on("click", function () {
        $(".images-page").css({
          display: "none",
        });
        $(".second-page-main").css({
          display: "none",
        });
        $(".gifs-page").css({
          display: "none",
        });
        $(".movies-page").css({
          display: "flex",
        });
        $.ajax(
          `http://www.omdbapi.com/?apikey=3fc35809&t=${inp2Value}&y=2000-2024`
        )
          .then(function movieDo(res) {
            $(`.movie-img`).attr(`src`, `${res.Poster}`);
            $(`.movie-name`).text(`${res.Title}`);
            $(`.movie-year`).text(`${res.Released}`);
            $(`.movie-actors`).text(`${res.Actors}`);
            $(`.movie-imdb`).text(`${res.imdbRating}`);
            $(`.movie-awards`).text(`${res.Awards}`);
            $(`.movie-boxoffice`).text(`${res.BoxOffice}`);
            $(`.find-button`).on("click", movieDo());
          })
          .catch(function (err) {
            console.log(`xeta bas verdi`, err);
          });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
