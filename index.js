window.addEventListener("load", () => {
  console.log("loaded script!");
  function playSound() {
    console.log(this);
  }
  const allSounds = document.querySelectorAll(".sound-panel > li");
  console.log(allSounds);
  document.addEventListener("keypress", playSound);
});
