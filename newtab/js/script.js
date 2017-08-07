$(window).on("load",function(){
  $(".button-collapse").sideNav({
    menuWidth: 300,
    edge: 'right'
  });

  // initialize task list
  chrome.storage.local.get(function (result){
    getTasks(result);
  });

  $('#task').on('keydown',function(e){
    if(e.which == '13'){
      saveTask();
      $('#task').val("");
    } 
  });
  $('#add-task').click(saveTask);
  $('#reset').click(clearTask);
  
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
      'query': 'landscape'
    },
		data: {},
		dataType: 'json',
    success: function(res){
      image = res;
    }
  })
  .done(function() {
    $('#background').css({
      background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + image.urls.regular + ')',
      backgroundSize:'cover'
    }).fadeTo(1500, 1, function(){
      $('#badge').show('slow');
      $('#credit').html('Photo by <a href="'+image.user.links.html+'">'+image.user.name+'</a> / <a href="https://unsplash.com/">Unsplash</a></div>')
    });
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
  }); 

  var today = new Date();
  timer();
  var dateStr = today.toDateString();
  $('#date').html(dateStr);
});
/*****************************************************************************
 * ^^^^^^^^^^^^^^^^ WINDOW LOAD FUNCTION ENDS HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^
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

function saveTask() {
  //get the value from input
  var value = $('#task').val();
  var array = [];
  if (!value) {
    console.log("Missing Parameter")
  } else {
    chrome.storage.local.get(function(result){
      if (result.tasks) array = result.tasks;
      array.push(value);
      chrome.storage.local.set({tasks: array}, function (){
        chrome.storage.local.get(function (result){
          getTasks(result);
        });
      });
    });
  }
}

function getTasks(result) {
  if (result.tasks) {
    var list = "";
    array = result.tasks;
    for (i = 0; i < array.length; i++){
      list +="<li class='list' id=" + i +">"+array[i]+"<span class='right delete'><a href='#'><i class='fa fa-times' aria-hidden='true'></i></a></span></li>";
    }
  }
  $("#task-list").html(list);
}


function clearTask() {
  chrome.storage.local.clear();
  $("#task-list").html("");
}