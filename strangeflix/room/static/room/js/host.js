//fetch room id
alert("Add videos from the website in other tab.");
const room_id = JSON.parse(document.getElementById('room-id').textContent);
var checkList = JSON.parse(localStorage.getItem('roomlist'));
            if(checkList)
            {
                if(checkList.rooms.find((s)=> s===room_id))
                {
                    alert("Host is already opened in another tab.Redirecting...");
                    window.location.href = "/room"
                }
                else
                {

                    addRoomToList();
                }
            }
            else
            {

                addRoomToList();
            }

        //connect to respective room socket
        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/room/'
            + room_id
            + '/'
        );

        //Update room member from host
        function hostUpdate()
        {
            const message = "Host update";
            const pausedStatus = video.paused;
            const currentTimeStatus = video.currentTime;
            const videoStatus  = video.innerHTML; 
            chatSocket.send(JSON.stringify({
                'type' : 'hostupd',
                'message': message,
                'pausedStatus':pausedStatus,
                'currentTimeStatus':currentTimeStatus,
                'videoStatus':videoStatus,
                'users':users,
            }));
        }
        //Checks applied on room connection
        chatSocket.onopen = function(e){
            hostUpdate();
            fillUsers();
        }
        var users = []
        //Update online user list
        function fillUsers()
        {
            document.querySelector('#user-log').innerHTML = '';
            userslist = users.filter((item, i, ar) => ar.indexOf(item) === i);
            userslist.forEach(element => {
                document.querySelector('#user-log').innerHTML += element+'<br>';
            });
        }
        //Receive message from Websocket
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            if(data.type === 'chat_message')
            {
                document.querySelector('#chat-log').innerHTML += (data.user+' : '+data.message + '<br>');
            }
            if(data.type === 'play')
            {
                document.querySelector('#chat-log').innerHTML += (data.user+' : '+data.message + '<br>');
                togglePlay();
            }
            if(data.type === 'skip')
            {
                document.querySelector('#chat-log').innerHTML += (data.user+' : '+data.message + '<br>');
                skip(data.skipAmount);
            }
            if(data.type === 'upd')
            {
                document.querySelector('#chat-log').innerHTML += (data.user+' : '+data.message + '<br>');
                upd(data.updTime);
            }
            if(data.type === 'join')
            {
                hostUpdate();
            }
            if(data.type === 'add_user')
            {
                console.log(typeof(data.user))
               
                users.push(""+data.user)
                fillUsers()
            }
            if(data.type === 'remove_user')
            {
                if(users.find((s)=> s===data.user))
                {
                    const index = users.indexOf(data.user);
                    console.log(index);
                    if (index > -1) {
                    users.splice(index, 1);
                    }
                }
                fillUsers()
            }

        };

        //On when Socket is closed
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');

        };

        //Send chat message to the socket
        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'type' : 'chat_message',
                'message': message
            }));
            messageInputDom.value = '';
        };



        // For data transfer across tabs
        const roomChannel = new BroadcastChannel('room-channel');
        function addRoomToList()
        {
            var roomList = JSON.parse(localStorage.getItem('roomlist'));
            if(!roomList)
            {
                roomList = {
                    rooms:[]
                }
            }
            roomList.rooms.push(room_id);
            localStorage.setItem('roomlist',JSON.stringify(roomList));

        }
        window.addEventListener('beforeunload',function (e){

            var roomList = JSON.parse(localStorage.getItem('roomlist'));
            if(roomList.rooms.find((s)=> s===room_id))
            {
                const index = roomList.rooms.indexOf(room_id);
                console.log(index);
                if (index > -1) {
                    roomList.rooms.splice(index, 1);
                }

            }
            localStorage.setItem('roomlist',JSON.stringify(roomList));
        });
        roomChannel.onmessage = function(e) {
            const message = e.data;
            console.log(room_id === e.data.room_id);
            if(room_id == e.data.room_id)
            {
                console.log(e.data.videoData);
                video.innerHTML = e.data.videoData;
                video.load();
                video.currentTime = 0;
                video.pause();
                video.load();
                hostUpdate();
            }
        };




// player
const player = document.querySelector('.player');

// video
const video = player.querySelector('.viewer');

// progress
const progress = player.querySelector('.progress');

// progress__filled
const progressBar = player.querySelector('.progress__filled');

// toggle play/pause
const playpause = player.querySelector('.toggle');

// skipButtons
const skipButtons = player.querySelectorAll('[data-skip]');

// ranges for volume and speed
const ranges = player.querySelectorAll('.player__slider');

//setting volume of video to be zero as to facilitate autoplay
video.volume = 0;
// progress-bar
function updHelper(e)
{
    const updTime = (e.offsetX / progress.offsetWidth) * video.duration;
    const message = "Time Update";
    chatSocket.send(JSON.stringify({
        'type' : 'upd',
        'message': message,
        'updTime':updTime
    }));
    
}
function upd(updTime) {
    video.currentTime = updTime;
}
let mousedown = false;

// update when click event is fired
progress.addEventListener('click', updHelper);
progress.addEventListener('mousemove', (e) => mousedown && updHelper(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// play/pause
function togglePlayHelper()
{
    const message = "Play Pause";
    chatSocket.send(JSON.stringify({
        'type' : 'play',
        'message': message
    }));

}
function togglePlay() {
    if (video.paused || video.ended) {
        var pl = video.play();
        if (pl != undefined) {
            pl.then(_ => {})
                .catch(error => {
                    video.pause();
                });
        }
    } else {
        video.pause();
    }
}
playpause.addEventListener('click', togglePlayHelper);

function updateButton() {
    var icon = document.getElementById("play-icon");
    var title = document.querySelector(".player__button");
    if (this.paused) {
        icon.setAttribute("class", "fas fa-play");
        title.setAttribute("title", "play");
    } else {
        icon.setAttribute("class", "fas fa-pause");
        title.setAttribute("title", "pause");
    }
}

// toggle when click event is fired on the video
video.addEventListener('click', togglePlayHelper);

// change the icon based on the event fired
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// skip 
function skipHelper()
{
    const message = "Skip";
    chatSocket.send(JSON.stringify({
        'type' : 'skip',
        'message': message,
        'skipAmount':this.dataset.skip 
    }));
}
function skip(skipAmount) {
    video.currentTime += parseFloat(skipAmount);
}

skipButtons.forEach(button => button.addEventListener('click', skipHelper));


// volume and speed
var prev = video.volume;

function handleRangeUpdate() {
    var vol = document.querySelector("#vol-ico");
    var titl = document.querySelector(".volume__button");
    if (this.name == "volume") {
        if (this.value == 0) {
            vol.setAttribute("class", "fas fa-volume-mute");
            titl.setAttribute("title", "unmute");
        } else {
            vol.setAttribute("class", "fas fa-volume-up");
            titl.setAttribute("title", "mute");
            prev = this.value;
        }
    }
    video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
var voloff = document.querySelector("#volume");
voloff.addEventListener('click', function (e) {
    var vol = document.querySelector("#vol-ico");
    var inputRange = document.querySelector("#vol-ran");
    var titl = document.querySelector(".volume__button");
    if (video.volume == 0) {
        vol.setAttribute("class", "fas fa-volume-up");
        titl.setAttribute("title", "mute");
        inputRange.value = prev;
        video.volume = prev;
    } else {
        prev = video.volume;
        video.volume = 0;
        inputRange.value = "0";
        vol.setAttribute("class", "fas fa-volume-mute");
        titl.setAttribute("title", "unmute");
    }
});

// handle progress and timer on time update event

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    var current = document.getElementById("current");
    var timeDuration = document.getElementById("duration");
    // curr mins spend
    var currmins = Math.floor(video.currentTime / 60);

    // curr secs spend
    var currsecs = Math.floor(video.currentTime - currmins * 60);

    // total mins 
    var durmins = video.currentTime==0?0:Math.floor(video.duration / 60);

    //total secs
    var dursecs = video.currentTime==0?0:Math.floor(video.duration - durmins * 60);

    if (currsecs < 10) {
        currsecs = "0" + currsecs;
    }
    if (dursecs < 10) {
        dursecs = "0" + dursecs;
    }
    if (currmins < 10) {
        currmins = "0" + currmins;
    }
    if (durmins < 10) {
        durmins = "0" + durmins;
    }
    current.innerHTML = currmins + ":" + currsecs + " / ";
    timeDuration.innerHTML = durmins + ":" + dursecs;
}
video.addEventListener('timeupdate', handleProgress);

// fullscreen 
var fulls = document.getElementById("fs");
fulls.addEventListener("click", async function (event) {
    try {
        // if already in full screen then exit
        if (document.fullscreen) {
            await document.exitFullscreen();
            document.getElementById("fs-ico").setAttribute("class", "fas fa-expand");
            fulls.setAttribute("title", "fullscreen(f)");
        }
        // if not fullscreen then request for fullscreen mode
        else {
            await player.requestFullscreen();
            document.getElementById("fs-ico").setAttribute("class", "fas fa-compress");
            fulls.setAttribute("title", "exit fullscreen(f)");
        }
    } catch (error) {
        console.log(error);
    }
});










