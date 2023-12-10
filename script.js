let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let rewindButton = document.getElementById("rewind");
let fastForwardButton = document.getElementById("fastForward");
let songTitle = document.querySelector(".music-player h1");
let songSinger = document.querySelector(".music-player p");


song.addEventListener('loadeddata', function () {
    // Extract information from the loaded audio file path
    let mediaSource = new URL(song.currentSrc).pathname;
    let fileNameWithoutExtension = mediaSource.split('/').pop().replace('.mp3', '');
    let parts = fileNameWithoutExtension.split('_');

    console.log('Filename:', mediaSource);
    console.log('Title:', parts[0]);
    console.log('Singer:', parts.slice(1).join(' '));

    // Set the song title and singer based on filename parts
    songTitle.textContent = parts[0];
    songSinger.textContent = parts.slice(1).join(' ');
});


// Attach event listeners after setting the src attribute
song.addEventListener('timeupdate', function () {
    progress.value = song.currentTime;
});

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.src = "./images/pause.png";
    } else {
        song.pause();
        ctrlIcon.src = "./images/play-button-arrowhead.png";
    }
}

setInterval(() => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);

progress.onchange = function () {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrlIcon.src = "./images/pause.png";
    } else {
        song.pause();
        ctrlIcon.src = "./images/play-button-arrowhead.png";
    }
};

rewindButton.onclick = function () {
    song.currentTime = 0;
};

fastForwardButton.onclick = function () {
    song.currentTime = song.duration;
};
