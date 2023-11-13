let images = {};

for (let i = 0; i < 10; i++) {
  images[i] = [];
  for (let j = 0; j < 2; j++) {
    images[String(i)].push(`assets/${i}_${j}.png`);
  }
}

let currentFrame = 0;
let min = 0;
let seconds = 0;
let isPaused = false;
let animationInterval;
let counterInterval;

startBtn.onclick = () => {
  if (!isPaused && !(seconds > 0)) {
    seconds = secondsCountdown.value;
  }
  startCountDown();
};

resetBtn.onclick = () => {
  isPaused = false;
  secondsCountdown.value = 0;
  clearInterval(animationInterval);
  clearInterval(counterInterval);
  showAnimation(0, [min1, min2]); // from id
  showAnimation(0, [second1, second2]); // from id
};

stopBtn.onclick = () => {
  clearInterval(animationInterval);
  clearInterval(counterInterval);
};

function startCountDown() {
  min = 0;
  if (seconds > 60) {
    min = (seconds / 60).toFixed(0);
    seconds = seconds % 60;
  }

  // run once before the animation interval
  showAnimation(min, [min1, min2]); // from id
  showAnimation(seconds, [second1, second2]); // from id
  currentFrame = 1;

  animationInterval = setInterval(() => {
    showAnimation(min, [min1, min2]); // from id
    showAnimation(seconds, [second1, second2]); // from id
    currentFrame = currentFrame === 0 ? 1 : 0;
  }, 700);

  counterInterval = setInterval(() => {
    if (seconds === 0) {
      if (min === 0) {
        console.log('min', min);
        clearInterval(counterInterval);
        clearInterval(animationInterval);
        alert('Countdown finished');
      } else {
        min--;
      }
      seconds = 60;
    }
    seconds--;
  }, 1000);
}

function showAnimation(nums, imgElements) {
  nums = nums > 9 ? String(nums) : '0' + nums;

  let firstNumber = nums[0];
  let secondNumber = nums[1];

  imgElements[0].src = images[firstNumber][currentFrame];
  imgElements[1].src = images[secondNumber][currentFrame];
}
