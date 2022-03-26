let frame = 0;
let startTime = Date.now();

export function fpsCounter() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    console.log((frame / ((time - startTime) / 1000)).toFixed(1));
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(fpsCounter);
}
