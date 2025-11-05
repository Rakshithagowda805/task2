let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0;
let timer;
let running = false;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const lapsEl = document.getElementById("laps");

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(runTimer, 10);
  }
}

function runTimer() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
  millisecondsEl.textContent = pad(Math.floor(milliseconds / 10));
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

function pauseTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  hours = minutes = seconds = milliseconds = 0;
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  millisecondsEl.textContent = "00";
  lapsEl.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsEl.children.length + 1}: ${lapTime}`;
    lapsEl.appendChild(li);
  }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);