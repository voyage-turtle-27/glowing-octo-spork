$(document).ready(function(){
  console.log("ready");
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
