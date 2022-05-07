let frame = 0;
let startTime = Date.now();
export const gameSpeed = 20; //Slower as the number goes higher. 0 is basically as fast as the game will run.
export let fps = 60;

export function fpsCounter() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    fps = (frame / ((time - startTime) / 1000)).toFixed(1);
    console.log(fps);
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(fpsCounter);
}


// Timer
let minute = 0
let second = 0
let millisecond = 0;
let cron

// timer is started in app.js startGame() and resumed after pause in Game.js pauseGame()
export function startTimer() {
  pauseTimer()
  cron = setInterval(() => { timer() }, 10)
}

// timer is paused in app.js gameLoop()
export function pauseTimer() {
  clearInterval(cron)
}

// timer is reset in Game.js gameOver()
export function resetTimer(){
  pauseTimer()
  minute = 0
  second = 0
  document.getElementById("minute").innerText = "00"
  document.getElementById("second").innerText = "00"
}

function timer() {
  if ((millisecond+= 10) === 1000) {
    millisecond = 0
    second++
  }
  if (second === 60) {
    second = 0
    minute++
  }
  if (minute === 60) {
    minute = 0
  }
  document.getElementById("minute").innerText = returnTimerData(minute)
  document.getElementById("second").innerText = returnTimerData(second)
  //console.log(`minute: ${returnTimerData(minute)}, second: ${returnTimerData(second)}`)
}

function returnTimerData(input) {
  return input >= 10 ? input : `0${input}`
}

// lives
document.getElementById("lives").innerText = '❤'