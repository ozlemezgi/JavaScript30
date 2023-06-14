// Get our elements//
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar =player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons =player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//Build out Functions//
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

//Update the button icon 
function updateButton(){
    const icon = this.paused ? "►" : "❚ ❚"; 
    toggle.textContent = icon;
}

//Skip Buttons
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

//Volume and playback rate
function handleRangeUpdate(){
    video[this.name]=this.value;
    console.log(this.name);
    console.log(this.value);
}

//Progress Bar
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis =`${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
    console.log(e);
}

//Hook up the event listeners//
video.addEventListener("click",togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change",handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));

video.addEventListener("timeupdate",handleProgress);

let mousedown=false;
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove", (e)=>mousedown && scrub(e));
progress.addEventListener("mousedown",()=>mousedown=true)
progress.addEventListener("mousedown", () => (mouseup = false));


