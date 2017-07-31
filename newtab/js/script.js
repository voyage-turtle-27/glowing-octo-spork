$(document).ready(function(){
  console.log("ready");
  var api = '0a8d702c02c016cd97c093c6d37faa447c9d60f1515761fdd6adff8077e4261d';
  $.getJSON("https://api.unsplash.com/photos/random/?client_id=" + api, function(data) {
    var imageUrl = data.urls.regular;
    console.log(imageUrl);
    $('#background').css('background', 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + imageUrl + ')').fadeTo("slow", 1);
    $('#background').css('background-size','cover');
  })
  .done(function() {
    console.log('all done');
  });
  // $('#background').css('background', 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://source.unsplash.com/category/nature/daily")').fadeTo("slow", 1);
  // $('#background').css('background-size','cover');

  var today = new Date();
  timer();
  var dateStr = today.toDateString();
  $('#date').html(dateStr);
  //adding quotes
  $.ajax({
    url:'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    type: 'POST',
		data: {},
		dataType: 'json',
    success: function(res){
      $('#quote').html("<div>"+res.quote+" - "+res.author+"</div>");
    },
    beforeSend: function(xhr) {
		  xhr.setRequestHeader("X-Mashape-Authorization","Aol6HZ3fJJmsh9fxq2gR2J2UbTEjp1cEWmkjsnwhTDLhdkAlFU");
		}
  });
  //quotes ended
});
function timer(){
  console.log("timer fired.");
  var today = new Date();
  var hours = today.getHours();
  hours = hours<10 ? "0"+hours : hours;
  var minutes = today.getMinutes();
  minutes = minutes<10 ? "0"+minutes : minutes;
  var time = hours + ":" + minutes;
  var timeDom = $('#time');
  timeDom.html(time);
  var offset = (60 - today.getSeconds());
  setTimeout(timer, offset*500);
}
