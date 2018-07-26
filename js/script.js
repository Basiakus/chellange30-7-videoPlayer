const movieClip = document.getElementById('movieClip');
const playButton = document.getElementById('play');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[name]');
const progressBar = document.getElementById('progressBar');
const progressBox = document.getElementById('progressBox');
const fullscreenButton = document.getElementById('fullscreenButton');


//let isPlaying = false;
let isCliked = false;


function playAndPause() {
	//isPlaying = !isPlaying;
	if(movieClip.paused) {
		movieClip.play();
		//console.log('play');
		playButton.innerHTML = "&#9658";
	} else {
		movieClip.pause();
		//console.log('pause');
		playButton.innerHTML = "&#10074&#10074";
	};
}
function skipVideo() {
	console.log(this.dataset.skip);
	movieClip.currentTime += parseFloat(this.dataset.skip);
}
function rangeValueHandler() {
	//console.log(isCliked);
	if(!isCliked) return;
	movieClip[this.name] = this.value;
}
function progressHandle() {
	const videoProgression = (movieClip.currentTime / movieClip.duration) * 100;
	progressBar.style.width = `${videoProgression}%`;
}
function scrub(e) {
	const scrubTime = (e.offsetX / progressBox.offsetWidth) * movieClip.duration;
	movieClip.currentTime = scrubTime;
	//console.log(scrubTime);
}
function fullscreen() {
	console.log('full');
	const videoPlayer = document.getElementById('videoPlayer');
	videoPlayer.classList.toggle("fullscreen");
	document.body.classList.toggle("fullscreen");
}


playButton.addEventListener('click', playAndPause);
skipButtons.forEach( button => button.addEventListener('click', skipVideo));
movieClip.addEventListener('timeupdate', progressHandle);
progressBox.addEventListener('click', scrub);
fullscreenButton.addEventListener('click', fullscreen);
document.body.addEventListener('keyup', function(e) {
	console.log(e.keyCode);
	e.preventDefault();
	if (e.keyCode == 32) {
		playAndPause();
	} else {
		return;
	}
});


ranges.forEach( range => range.addEventListener('click', function() {
	isCliked = true;
	rangeValueHandler();
}));
ranges.forEach( range => range.addEventListener('mousedown', function() {
	isCliked = true;
	rangeValueHandler();
}));
ranges.forEach( range => range.addEventListener('touchstart', function() {
	isCliked = true;
	rangeValueHandler();
}));


ranges.forEach( range => range.addEventListener('mouseup', function() {
	isCliked = false;
	if(this.name === 'playbackRate') {
		this.value = 1;
		movieClip.playbackRate = this.value;
	}
}));
ranges.forEach( range => range.addEventListener('touchend', function() {
	isCliked = false;
	if(this.name === 'playbackRate') {
		this.value = 1;
		movieClip.playbackRate = this.value;
	}
}));



ranges.forEach( range => range.addEventListener('mousemove', rangeValueHandler));
ranges.forEach( range => range.addEventListener('touchmove', rangeValueHandler));










