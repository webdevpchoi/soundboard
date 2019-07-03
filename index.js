window.addEventListener("load", () => {
  console.log("loaded script!");
  function playSound(e) {
    const audio = document.querySelector(`audio[data-key=${e.key}]`);
    if (!audio) return;
    audio.play();
  }
  //listen for all keypress events on the window
  window.addEventListener("keypress", playSound);
});
