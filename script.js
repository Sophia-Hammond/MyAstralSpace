// Change background video when dropdown changes
function changeVideo() {
    const video = document.getElementById('bgVideo');
    const selector = document.getElementById('videoSelector');
    const source = video.querySelector('source');
  
    source.src = `videos/${selector.value}`;
    video.load();
    video.play();
  }
  
  // Set default video on page load
  window.onload = () => {
    const video = document.getElementById('bgVideo');
    const source = video.querySelector('source');
    source.src = 'videos/stars.mp4';
    video.load();
    video.play();
  };
  
  // Add floating note to the board
  function addNoteToBoard(text) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerText = text;
  
    const board = document.getElementById('noteBoard');
  
    const maxX = window.innerWidth - 220;
    const maxY = window.innerHeight - 120;
  
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
  
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
  
    board.appendChild(note);
  }
  
  // Handle form submission
  document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;
  
    addNoteToBoard(text);
    input.value = '';
  });
  