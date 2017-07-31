$(document).ready(function(){
  console.log("ready");
  var api = '0a8d702c02c016cd97c093c6d37faa447c9d60f1515761fdd6adff8077e4261d';
  $.getJSON("https://api.unsplash.com/photos/random/?client_id=" + api, function(data) {
    var imageUrl = data.urls.regular;
    console.log(imageUrl);
    $('#background').css('background-image', 'url(' + imageUrl + ')').fadeTo("slow", 1);
  })
    .done(function() {
      console.log('all done');
    });
  
  var today = new Date();
  timer();
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  //var dateStr = days[today.getDay()];
  var dateStr = today.toDateString();
  $('#date').html(dateStr);
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
