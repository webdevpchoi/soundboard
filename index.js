window.addEventListener("load", () => {
  console.log("loaded script!");
  //Select all keys and turn from Nodelist into Array
  const keys = Array.from(document.querySelectorAll("li[data-key]"));

  //when transition ends, remove it
  function removeTransition(e) {
    if (e.propertyName !== "filter") return;
    e.target.classList.remove("playing");
  }
  //add removetransition eventhandler to all keys
  for (let key of keys) {
    key.addEventListener("transitionend", removeTransition);
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key=${e.key}]`);
    const key = document.querySelector(`li[data-key=${e.key}]`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.toggle("playing");
  }
  window.addEventListener("keydown", playSound);
});
