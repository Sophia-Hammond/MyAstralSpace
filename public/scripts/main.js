
// video switching logic //

const bgVideo = document.getElementById("bgVideo");
const videoSelector = document.getElementById("videoSelector");
const generateButton = document.getElementById("generateRandom");

const videos = {
    videoname: "Cloud ",
    videonae: "link to video",
};


const videos = {
Nebula: "StarBackground.mp4",
"FullMoonBackground.mp4",
"WomanAstralBackground.mp4",
ForestMoon:"forestMoon.mp4",
Jellyfish: "jellyfish.mp4",
MushroomWoods:"mushroomWoods.mp4",
ManSittingByTheMoon: "manByMoon.mp4",
"cloudSkyBackground.mp4",
"peacfulSpace.mp4", 
"heavenlyWater.mp4",





LofiCity:"lofiCity.mp4",
LofiLandscape:"lofiLandscape.mp4",
"lofiGold.mp4",
LofiStudy:"lofiStudy.mp4",
"lofiMountinGirl.mp4",
LofiBoy:"lofiBoy.mp4",
LofiMoonlightStudy:"lofiMoonlightStudy.mp4",
LofiMountin:"lofiMountin.mp4",
LofiBedroomChill:"lofiRelaxingBedroom.mp4",
}


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

// Function to submit the thought
async function submitThought() {
    const noteText = document.getElementById("noteInput").value;
    const boardBackground = document.getElementById("bgVideo").src; // Get the selected background
  
    // Ensure the user is logged in
    const response = await fetch("/auth/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const result = await response.json();
    if (!result.loggedIn) {
      alert("You must be logged in to save your board.");
      return;
    }
  
    // Save thought to the page
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = noteText;
    document.body.appendChild(note);
  
    // Add random position (will float across the screen)
    note.style.position = "absolute";
    note.style.left = `${Math.random() * window.innerWidth}px`;
    note.style.top = `${Math.random() * window.innerHeight}px`;
  
    // Save thought to the backend (to the user’s thought board)
    const thoughtData = {
      thoughts: [{ text: noteText, position: { x: note.offsetLeft, y: note.offsetTop } }],
      background: boardBackground,
    };
  
    await fetch("/boards/create", {
      method: "POST",
      body: JSON.stringify(thoughtData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // Clear input field
    document.getElementById("noteInput").value = "";
  }
  