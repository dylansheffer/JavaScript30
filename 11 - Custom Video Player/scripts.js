const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
// skipButtons is selecing all elements with a 'data-skip' custom element
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

function togglePlay() {
    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause()
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // works becuase the names of the inputs correspond with the
    // video property
    video[this.name] = this.value
    console.log(this.value);
}

function handleProgress() {
    // Calculates the percentage of the video played so far
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis =  `${percent}%`
}

function scrub(e) {
    // offsetX is the position of the mouse click when it occured
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
    console.log(e);
}

function toggleFullscreen() {
    if(!document.fullscreenElement) {
        const calls = video.requestFullscreen
            || video.webkitRequestFullScreen
            || video.mozRequestFullScreen
            || video.msRequestFullscreen
        ;
        calls.call(video);
    } else {
        document.exitFullscreen();
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', toggleFullscreen);

