const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timer;

btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

handlerStop();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handlerStart(evt) {
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function handlerStop(evt) {
  clearInterval(timer);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
