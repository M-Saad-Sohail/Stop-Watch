let digitalMilliSec = document.getElementById('digitalMilliSec');
let digitalSec = document.getElementById('digitalSec');
let digitalMin = document.getElementById('digitalMin');
let digitalHr = document.getElementById('digitalHr');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let dummySec = document.getElementById('dummySec');
let dummyMin = document.getElementById('dummyMin');
let dummyHr = document.getElementById('dummyHr');
let milliSec = 0;
let sec = 0;
let min = 0;
let hr = 0;
let startTimer;

// ======================================== SOUND EFFECT ===========================================

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var source;

function playMySong(url) {
    source = audioContext.createBufferSource();
    var request = new XMLHttpRequest();
    
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
    request.onload = function() {
        var audioData = request.response;
        
        audioContext.decodeAudioData(audioData, function(buffer) {
            source.buffer = buffer;
            source.loop = true;
            source.connect(audioContext.destination);
            source.start(0);
        });
    };
    
    request.send();
}

function stopMySong() {
    if (source) {
        source.stop();
        source.disconnect();
    }
}

// ======================================== START ===========================================

let start = () => {
    startTimer = setInterval(() => {
        milliSec++
        if (milliSec == 10) {
            milliSec = 0;
            sec++;
            if (sec == 60) {
                sec = 0;
                min++;
                if (min == 60) {
                    min = 0;
                    hr++;
                }
            }
            if (sec == 10) {
                dummySec.classList.toggle("hidden");
            }
            if (sec == 0) {
                dummySec.classList.toggle("hidden");
                if (min == 10) {
                    dummyMin.classList.toggle("hidden");
                }
                if (min == 0) {
                    dummyMin.classList.toggle("hidden");
                    if (hr == 10) {
                        dummyHr.classList.toggle("hidden");
                    }
                    if (hr == 0) {
                        dummyHr.classList.toggle("hidden");
                    }
                }
            }
        }
        digitalMilliSec.innerHTML = milliSec;
        digitalSec.innerHTML = sec;
        digitalMin.innerHTML = min;
        digitalHr.innerHTML = hr;
    }, 100)
    startBtn.style.pointerEvents = "none";
    stopBtn.style.pointerEvents = "auto";


playMySong('Clock-Ticking.mp3');

}

// ======================================== STOP ===========================================

let stop = () => {
    clearInterval(startTimer)
    stopBtn.style.pointerEvents = "none";
    startBtn.style.pointerEvents = "auto";
}

// ======================================== RESET ===========================================

let reset = () => {
    clearInterval(startTimer)
    milliSec = 0;
    sec = 0;
    min = 0;
    hr = 0;
    digitalMilliSec.innerHTML = milliSec;
    digitalSec.innerHTML = sec;
    digitalMin.innerHTML = min;
    digitalHr.innerHTML = hr;
    startBtn.style.pointerEvents = "auto";
    stopBtn.style.pointerEvents = "auto";
}

