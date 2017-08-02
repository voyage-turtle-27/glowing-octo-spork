$(window).on("load",function(){
  $('#photo').hide();
  var block = false;

  /*****************************************************************************
   * GET RANDOM PHOTO REQUEST
   *****************************************************************************/
  var api = '0a8d702c02c016cd97c093c6d37faa447c9d60f1515761fdd6adff8077e4261d';
  var image;
  $.ajax({
    url:'https://api.unsplash.com/photos/random/',
    type: 'GET',
    headers: {
      'authorization': "Client-ID " + api,
      'orientation': 'landscape',
      'query': 'nature'
    },
		data: {},
		dataType: 'json',
    success: function(res){
      image = res;
    }
  })
  .done(function() {
    $('#background').css({
      background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + image.urls.regular + ')',
      backgroundSize:'cover'
    }).fadeTo(2000, 1);
    $('#credit').html('Photo by <a href="'+image.user.links.html+'">'+image.user.name+'</a> / <a href="https://unsplash.com/">Unsplash</a></div>')
  });

  /*****************************************************************************
   * GET RANDOM QUOTE REQUEST
   *****************************************************************************/
  $.ajax({
    url:'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    type: 'POST',
		data: {},
		dataType: 'json',
    success: function(res){
      $('#quote-text').html(res.quote);
      $('#quote-author').html(res.author);
    },
    beforeSend: function(xhr) {
		  xhr.setRequestHeader("X-Mashape-Authorization","Aol6HZ3fJJmsh9fxq2gR2J2UbTEjp1cEWmkjsnwhTDLhdkAlFU");
		}
  });

  /*****************************************************************************
   * CLOCK/PHOTO CREDITS TRANSITION EFFECT
   *****************************************************************************/
  $(".clock").mouseenter(function(){
    if (!block){
      block = true;
      $("#date, #time").fadeOut(function() {      
        $("#photo").fadeIn(function(){
          block = false;
        });
      });
     }
  });
  $(".clock").mouseleave(function(){
    if (!block){
      block = true;
      $("#photo").fadeOut(function() {      
        $("#date, #time").fadeIn(function(){
          block = false;
        });
      });
    }
  }); // 

  var today = new Date();
  timer();
  var dateStr = today.toDateString();
  $('#date').html(dateStr);
});
/*****************************************************************************
 * ^^^^^^^^^^^^^^^^ WINDOWS LOAD FUNCTION ENDS HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^
 *****************************************************************************/

function timer(){
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
