window.addEventListener("load", () => {
  console.log("loaded script!");
  //Select all keys and turn from Nodelist into Array
  const keys = Array.from(document.querySelectorAll("li[data-key]"));
  const record = document.querySelector(".record");
  const stop = document.querySelector(".stop");
  const reset = document.querySelector(".reset");
  const play = document.querySelector(".play");
  let lastTimeStamp;
  let recordedKeys = [];
  let isRecording = false;

  record.addEventListener("click", () => {
    lastTimeStamp = Date.now();
    isRecording = true;
  });
  stop.addEventListener("click", () => {
    isRecording = false;
  });
  reset.addEventListener("click", () => {
    recordedKeys = [];
  });
  play.addEventListener("click", function() {
    console.log(recordedKeys);
    playRecorded(recordedKeys);
  });

  //when transition ends, remove it
  function removeTransition(e) {
    if (e.propertyName !== "background-color") return;
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
    //if recording...
    if (isRecording) {
      const keyObject = {
        dataKey: key.dataset.key,
        timeStamp: Date.now() - lastTimeStamp
      };
      lastTimeStamp = Date.now();
      recordedKeys.push(keyObject);
      // console.log(keyObject.timeStamp);
    }
  }
  function playRecorded(arr) {
    let last = 0;
    for (let i = 0; i < arr.length; i++) {
      setTimeout(() => {
        const audio = document.querySelector(
          `audio[data-key=${arr[i].dataKey}]`
        );
        audio.play();
        audio.currentTime = 0;
      }, arr[i].timeStamp + last);
      console.log(arr[i].timeStamp + last)
      let = arr[i + 1].timeStamp - arr[i].timeStamp;
    }
  }

  //listen for all keypress events on the window
  window.addEventListener("keydown", playSound);
});
