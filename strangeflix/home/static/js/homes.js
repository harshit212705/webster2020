// adjusting comments section on window resize and window load 
window.addEventListener('resize', function (e) {
   var adjust = $('.player-wrapper').css('height');
   var hd = $('.ser-hd').css('height');
   var hdd = $('.bt-heig').css('height');
   adjust = parseInt(adjust)-parseInt(hd)-parseInt(hdd);
   $('#movie-vid-comments').css('height', adjust);
});
var adjust = $('.player-wrapper').css('height');
var hd = $('.ser-hd').css('height');
var hdd = $('.bt-heig').css('height');
adjust = parseInt(adjust)-parseInt(hd)-parseInt(hdd);
$('#movie-vid-comments').css('height', adjust);

// theatre mode 

// $('.theatre__button').on('click', function (e) {
//    var chk = $('.theatre__button').attr('class');
//    if (chk == 'theatre__button') {
//       $('.playlist-container').css('display', 'none');
//       $('.c-visible-t-mode').css('display', 'block');
//       $('.player-wrapper').attr('class', 'col-xl-12 col-lg-12 col-md-12 player-wrapper');
//       $('.theatre__button').attr('class', 'theatre__button hellooo');
//       $('.video-body').css('padding', '0% 13%');
//    } else {
//       $('.playlist-container').css('display', 'block');
//       $('.c-visible-t-mode').css('display', 'none');
//       $('.player-wrapper').attr('class', 'col-xl-9 col-lg-8 col-md-7 player-wrapper');
//       $('.theatre__button').attr('class', 'theatre__button');
//       $('.video-body').css('padding', '0% 9%');
//    }
// });



// function to toggle Login modal
$('#signup').on('click', function () {
   $('#loginModal').modal('toggle')
});
$('#login').on('click', function () {
   $('#signupModal').modal('toggle')
});




// var playerVid = new DoublyLinkedList();

// when clicked on prev or next button get the next value in the linked list ad run it on the player
// window.addEventListener('load',function(e){
//   $('#pl-vid').children('li').each(function(){
//      $(this).children('a').each(function(){
//         playerVid.insert(this);
//      });
//   })
//   let currNode=playerVid.head;
//   while(currNode!=null){
//    console.log(currNode.data);
//    currNode=currNode.next;
//   }
// })


// load video when clicked on a video


// search by name and tag

$('#sear-by-nam').on('click', function (e) {
   $('#sear').attr('placeholder', 'search by name');
})

$('#sear-by-tag').on('click', function (e) {
   $('#sear').attr('placeholder', 'search by tag');
})



// movie rating

var movielistItem = [];
var movierating = 0;
$('.movierating-val').each(function (e) {
   movielistItem.push(this);
   $(this).on('click', function (e) {
      for (var ind in movielistItem) {
         $(movielistItem[ind]).css('color', 'white');
      }
      var val = $($(this)).attr('value');
      val = parseInt(val);
      movierating = val;
      for (var ind in movielistItem) {
         $(movielistItem[ind]).css('color', 'red');
         if (ind == val - 1) {
            break;
         }
      }
   })
})



// series rating

var serieslistItem = [];
var seriesrating = 0;
$('.seriesrating-val').each(function (e) {
   serieslistItem.push(this);
   $(this).on('click', function (e) {
      for (var ind in serieslistItem) {
         $(serieslistItem[ind]).css('color', 'white');
      }
      var val = $($(this)).attr('value');
      val = parseInt(val);
      seriesrating = val;
      for (var ind in serieslistItem) {
         $(serieslistItem[ind]).css('color', 'red');
         if (ind == val - 1) {
            break;
         }
      }
   })
})



// comment full show
$('.show-mr-button').on('click',function(e){
   // console.log($('.show-mr-button').text().trim());
   if($('.show-mr-button').text().trim()=='show'){
      $('.d-cent').css('display','block');
      $('.show-mr-button').text('hide');
   }
   else
   {
      $('.d-cent').css('display','-webkit-box');
      $('.show-mr-button').text('show');
   }
})


// progress-bar

function movie_upd(e) {
   const movie_updTime = (e.offsetX / movie_progress.offsetWidth) * movie_video.duration;
   movie_video.currentTime = movie_updTime;
}

// play/pause

function movie_togglePlay() {
   if (movie_video.paused || movie_video.ended) {
      var movie_pl = movie_video.play();
      if (movie_pl != undefined) {
         movie_pl.then(_ => {})
               .catch(error => {
                  movie_video.pause();
               });
      }
   } else {
      movie_video.pause();
   }
}

function movie_updateButton() {
   var movie_icon = document.getElementById("movie-play-icon");
   var movie_title = document.querySelector(".player__button");
   if (this.paused) {
      movie_icon.setAttribute("class", "fas fa-play");
      movie_title.setAttribute("title", "play");
   } else {
      movie_icon.setAttribute("class", "fas fa-pause");
      movie_title.setAttribute("title", "pause");
   }
}

// skip 

function movie_skip() {
   movie_video.currentTime += parseFloat(this.dataset.skip);
}

function movie_handleRangeUpdate() {
   var movie_vol = document.querySelector("#movie-vol-ico");
   var movie_titl = document.querySelector(".volume__button");
   if (this.name == "volume") {
      if (this.value == 0) {
         movie_vol.setAttribute("class", "fas fa-volume-mute");
         movie_titl.setAttribute("title", "unmute");
      } else {
         movie_vol.setAttribute("class", "fas fa-volume-up");
         movie_titl.setAttribute("title", "mute");
         movie_prev = this.value;
      }
   }
   movie_video[this.name] = this.value;
}

// handle progress and timer on time update event

function movie_handleProgress() {
   const movie_percent = (movie_video.currentTime / movie_video.duration) * 100;
   movie_progressBar.style.flexBasis = `${movie_percent}%`;
   var movie_current = document.getElementById("movie-current");
   var movie_timeDuration = document.getElementById("movie-duration");
   // curr mins spend
   var movie_currmins = Math.floor(movie_video.currentTime / 60);

   // curr secs spend
   var movie_currsecs = Math.floor(movie_video.currentTime - movie_currmins * 60);

   // total mins
   var movie_durmins = movie_video.currentTime==0?0:Math.floor(movie_video.duration / 60);

   //total secs
   var movie_dursecs = movie_video.currentTime==0?0:Math.floor(movie_video.duration - movie_durmins * 60);

   if (movie_currsecs < 10) {
      movie_currsecs = "0" + movie_currsecs;
   }
   if (movie_dursecs < 10) {
      movie_dursecs = "0" + movie_dursecs;
   }
   if (movie_currmins < 10) {
      movie_currmins = "0" + movie_currmins;
   }
   if (movie_durmins < 10) {
      movie_durmins = "0" + movie_durmins;
   }
   movie_current.innerHTML = movie_currmins + ":" + movie_currsecs + " / ";
   movie_timeDuration.innerHTML = movie_durmins + ":" + movie_dursecs;
}

// function to handle if user wants to resume playing video from where he last left
function resume_play(history_time) {
   $('#resume_btn').css('display', 'none');
   movie_video.currentTime = history_time;
}


var movie_player, movie_video, movie_progress, movie_progressBar, movie_playpause, movie_skipButtons, movie_ranges;
var movie_mousedown, movie_prev, movie_voloff, movie_fulls, movie_pip, movie_total_duration;
var movie_playback, movie_quality, movie_dis, movie_plbk, movie_qual, movie_seli;
// var movie_packet_start_time = 0, movie_maxtime_fetched = 0, movie_nextpacket_url = '', movie_fetcherror = '';
// var movie_previous_time_watched = 0;



function initialize_movie_player() {
   // console.log('initialized');
   // player
   movie_player = document.querySelector('.player');

   // video
   movie_video = movie_player.querySelector('.viewer');

   // progress
   movie_progress = movie_player.querySelector('.progress');

   // progress__filled
   movie_progressBar = movie_player.querySelector('.progress__filled');

   // toggle play/pause
   movie_playpause = movie_player.querySelector('.toggle');

   // skipButtons
   movie_skipButtons = movie_player.querySelectorAll('[data-skip]');

   // ranges for volume and speed
   movie_ranges = movie_player.querySelectorAll('.player__slider');

   movie_mousedown = false;

   // update when click event is fired
   movie_progress.addEventListener('click', movie_upd);
   movie_progress.addEventListener('mousemove', (e) => movie_mousedown && movie_upd(e));
   movie_progress.addEventListener('mousedown', () => movie_mousedown = true);
   movie_progress.addEventListener('mouseup', () => movie_mousedown = false);

   movie_playpause.addEventListener('click', movie_togglePlay);


   // toggle when click event is fired on the video
   movie_video.addEventListener('click', movie_togglePlay);

   // change the icon based on the event fired
   movie_video.addEventListener('play', movie_updateButton);
   movie_video.addEventListener('pause', movie_updateButton);

   movie_skipButtons.forEach(movie_button => movie_button.addEventListener('click', movie_skip));

   // volume and speed
   movie_prev = movie_video.volume;

   movie_ranges.forEach(movie_range => movie_range.addEventListener('change', movie_handleRangeUpdate));
   movie_ranges.forEach(movie_range => movie_range.addEventListener('mousemove', movie_handleRangeUpdate));
   movie_voloff = document.querySelector("#movie-volume");
   movie_voloff.addEventListener('click', function (e) {
      var movie_vol = document.querySelector("#movie-vol-ico");
      var movie_inputRange = document.querySelector("#movie-vol-ran");
      var movie_titl = document.querySelector(".volume__button");
      if (movie_video.volume == 0) {
         movie_vol.setAttribute("class", "fas fa-volume-up");
         movie_titl.setAttribute("title", "mute");
         movie_inputRange.value = movie_prev;
         movie_video.volume = movie_prev;
      } else {
         movie_prev = movie_video.volume;
         movie_video.volume = 0;
         movie_inputRange.value = "0";
         movie_vol.setAttribute("class", "fas fa-volume-mute");
         movie_titl.setAttribute("title", "unmute");
      }
   });

   movie_video.addEventListener('timeupdate', movie_handleProgress);

   // fullscreen 
   movie_fulls = document.getElementById("movie-fs");
   movie_fulls.addEventListener("click", async function (event) {
      try {
         // if already in full screen then exit
         if (document.fullscreen) {
               await document.exitFullscreen();
               $('.pip__button').css('display','block');
               $('.theatre__button').css('display','block');
               document.getElementById("movie-fs-ico").setAttribute("class", "fas fa-expand");
               movie_fulls.setAttribute("title", "fullscreen(f)");
         }
         // if not fullscreen then request for fullscreen mode
         else {
               await movie_player.requestFullscreen();
               $('.pip__button').css('display','none');
               $('.theatre__button').css('display','none');
               document.getElementById("movie-fs-ico").setAttribute("class", "fas fa-compress");
               movie_fulls.setAttribute("title", "exit fullscreen(f)");
         }
      } catch (error) {
         console.log(error);
      }
   });
   // on wait 
   movie_video.addEventListener('waiting',function(){
      if(movie_video.currentTime > 0)
      document.querySelector('.d-on-wait').style.display="block";
   })

   // on canplay
   movie_video.addEventListener('canplay',function(){
      document.querySelector('.d-on-wait').style.display="none";
   })
   // picutre-in-picture 

   movie_pip = document.getElementById("movie-pip");
   movie_pip.addEventListener("click", async function (event) {
      movie_pip.disabled = true;
      try {
         if (movie_video !== document.pictureInPictureElement) {
               await movie_video.requestPictureInPicture();
               movie_pip.disabled = false;
         }
         // If already playing exit mide
         else {
               await document.exitPictureInPicture();
               movie_pip.disabled = false;
         }
      } catch (error) {
         console.log(error);
      } finally {
         movie_pip.disabled = false; // enable toggle at last
      }
   });


   // setting dropdown
   movie_playback = document.querySelector(".playbacki");
   movie_quality = document.querySelector(".quali");
   movie_dis = document.querySelectorAll(".dis");
   movie_plbk = document.querySelectorAll(".playback");
   movie_qual = document.querySelectorAll(".qual");
   movie_seli = document.querySelector(".dropdown-menu");
   movie_playback.addEventListener('click', function (e) {
      e.stopPropagation();
      movie_dis.forEach(element => {
         element.style.display = "none";
      });
      movie_qual.forEach(element => {
         element.style.display = "none";
      });
      movie_plbk.forEach(element => {
         element.style.display = "block";
      });
      movie_plbk.forEach(element => {
         element.addEventListener('click', function () {
            movie_video.playbackRate = element.innerHTML;
               movie_qual.forEach(element => {
                  element.style.display = "none";
               });
               movie_plbk.forEach(element => {
                  element.style.display = "none";
               });
               movie_dis.forEach(element => {
                  element.style.display = "block";
               });
         });
      });
   });
   // movie_quality.addEventListener('click', function (e) {
   //    e.stopPropagation();
   //    movie_qual.forEach(element => {
   //       element.style.display = "block";
   //    });
   //    movie_plbk.forEach(element => {
   //       element.style.display = "none";
   //    });
   //    movie_dis.forEach(element => {
   //       element.style.display = "none";
   //    });
   //    movie_qual.forEach(element => {
   //       element.addEventListener('click', function () {
   //             movie_qual.forEach(element => {
   //                element.style.display = "none";
   //             });
   //             movie_plbk.forEach(element => {
   //                element.style.display = "none";
   //             });
   //             movie_dis.forEach(element => {
   //                element.style.display = "block";
   //             });inser
   //       });
   //    });
   // })

   // theatre mode 

   $('.theatre__button').on('click', function (e) {
      var movie_chk = $('.theatre__button').attr('class');
      if (movie_chk == 'theatre__button') {
         var store=$('.d-wt-th').html();
         $('.d-wt-th').css('display', 'none');
         $('.d-wt-th').empty();
         $('.d-on-th').html(store);
         $('.d-on-th').css('display', 'block');
         $('.player-wrapper').attr('class', 'col-xl-12 col-lg-12 col-md-12 player-wrapper');
         $('.theatre__button').attr('class', 'theatre__button hellooo');
         $('.video-body').css('padding', '0% 13%');
      } else {
         var store=$('.d-on-th').html();
         $('.d-on-th').empty();
         $('.d-wt-th').html(store);
         $('.d-wt-th').css('display', 'block');
         $('.d-on-th').css('display', 'none');
         $('.c-visible-t-mode').css('display', 'none');
         $('.player-wrapper').attr('class', 'col-xl-9 col-lg-8 col-md-7 player-wrapper');
         $('.theatre__button').attr('class', 'theatre__button');
         $('.video-body').css('padding', '0% 9%');
      }
   });

   // resume button 
   var vid = document.getElementById("movie-video");
   vid.onloadedmetadata = function() {
      var history_time = document.getElementById('playing_video_history_time').innerHTML;
      if (history_time != 0) {

         // curr mins spend
         var movie_currmins = Math.floor(history_time / 60);

         // curr secs spend
         var movie_currsecs = Math.floor(history_time - movie_currmins * 60);

         if (movie_currsecs < 10) {
            movie_currsecs = "0" + movie_currsecs;
         }
         if (movie_currmins < 10) {
            movie_currmins = "0" + movie_currmins;
         }

         var resume_btn= '<div id="resume_btn" style="text-align: right;position:relative;top: -100px;"><button onclick="resume_play('+ history_time +')" class="btn btn-round btn-sm btn-danger">Resume playing at '+ movie_currmins +':'+ movie_currsecs +'</button></div>';

         $(resume_btn).insertAfter('.video-body');
         $('#resume_btn').fadeIn('slow', function(){
            $('#resume_btn').delay(5000).fadeOut();
         });
      }
   };
}



// room channel 
const roomChannel = new BroadcastChannel('room-channel');
function getRoomList(){
    document.getElementById("room-list").innerHTML='';
    var roomList = JSON.parse(localStorage.getItem('roomlist'));
    if( (!roomList) || roomList.rooms.length == 0)
    {
        document.getElementById("room-list").innerHTML+='<a href="#" onclick = "hideRoomList()">No rooms Available</a>';
    }
    else
    {
        var uniqueRooms = roomList.rooms.filter((item, i, ar) => ar.indexOf(item) === i);
        uniqueRooms.forEach(element => {
            document.getElementById("room-list").innerHTML+='<a href="#" onclick="sendToTab('+element+')">'+element+'</a>';
        });
    }
    document.getElementById("room-list").style.display = "block";
}
function sendToTab(room_id)
{
    document.getElementById("room-list").style.display = "none";
    var videoData = document.getElementById("movie-video").innerHTML;
    var roomData = {
        'room_id':room_id,
        'videoData':videoData
    }
    roomChannel.postMessage(roomData);
    document.getElementById("room-list").style.display = "none";
}
function hideRoomList()
{
   document.getElementById("room-list").style.display = "none";
}
