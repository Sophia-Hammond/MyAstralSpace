
// video switching logic //

const bgVideo = document.getElementById("bgVideo");
const videoSelector = document.getElementById("videoSelector");
const generateButton = document.getElementById("generateRandom");

const videos = {
    videoname: "link to video ",
    videonae: "link to video",
};

// on change dropdown 
function changeVideo() {
    const selected = videoSelector.ariaValueMax;
    bgVideo.src = videos[selected];
    bgVideo.play();
}

// generate random space 
generateButton?.addEventListener("click", () => {
    const keys = Object.keys(videos);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    videoSelector.value = randomKey;
    changeVideo();
});

// load default video
window.addEventListener("DOMContentLoaded", () => {
    videoSelector.value = "stars";
    changeVideo();
});

// thought note subission
const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const noteBoard = document.getElementById("noteBoard");

const soundEffect = new Audio("sounds/submit.mp3"); // addd sound

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = noteInput.value.trim();
    if (!text) return;

    const note = document.createElement("div");
    note.className = "note";
    note.innerText = text;

    // random thoughts position within the screen 
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 150;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    note.style.left = `${randomX}px`;
    note.style.top = `${randomY}px`;

    noteBoard.appendChild(note);

    soundEffect.currentTime = 0;
    soundEffect.play();

    noteInput.value = "";

});