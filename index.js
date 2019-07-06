window.addEventListener("load", () => {
  console.log("loaded script!");
  //Select all keys and turn from Nodelist into Array
  const keys = Array.from(document.querySelectorAll("li[data-key]"));
  const record = document.querySelector(".record");
  const stop = document.querySelector(".stop");
  const reset = document.querySelector(".reset");
  console.log(record, stop);
  let recordedKeys = [];
  let isRecording = false;

  record.addEventListener("click", () => {
    isRecording = true;
  });
  stop.addEventListener("click", () => {
    isRecording = false;
  });
  reset.addEventListener("click", () => {
    isRecording = [];
  });

  //when transition ends, remove it
  function removeTransition(e) {
    if (e.propertyName !== "background-color") return;
    e.target.classList.remove("play");
  }
  //add removetransition eventhandler to all keys
  for (let key of keys) {
    key.addEventListener("transitionend", removeTransition);
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key=${e.key}]`);
    const keys = document.querySelector(`li[data-key=${e.key}]`);
    //if you're recording, push the key into the array
    if (isRecording) {
      recordedKeys.push(keys);
      console.log(recordedKeys);
    }
    console.log(recordedKeys);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    keys.classList.toggle("play");
  }

  //listen for all keypress events on the window
  window.addEventListener("keydown", playSound);
});
