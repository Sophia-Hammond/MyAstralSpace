document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("noteForm");
    const input = document.getElementById("noteInput");
    const board = document.getElementById("noteBoard");
    const sound = document.getElementById("submitSound");
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
  
      const note = document.createElement("div");
      note.className = "thought-note";
      note.textContent = text;
  
      // Random position
      const x = Math.random() * (window.innerWidth - 200);
      const y = Math.random() * (window.innerHeight - 200);
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
  
      // Add note
      board.appendChild(note);
  
      // Play sound
      sound.currentTime = 0;
      sound.play();
  
      input.value = "";
    });
  });
  