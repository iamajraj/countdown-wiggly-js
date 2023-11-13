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

startBtn.onclick = () => {
  startCountDown();
};

let animInterval;
let counterInterval;

function startCountDown() {
  seconds = secondsCountdown.value;
  min = 0;
  if (seconds > 60) {
    min = (seconds / 60).toFixed(0);
    seconds = seconds % 60;
  }

  animInterval = setInterval(() => {
    showAnimation(min, [min1, min2]);
    showAnimation(seconds, [second1, second2]);
    currentFrame = currentFrame === 0 ? 1 : 0;
  }, 700);

  counterInterval = setInterval(() => {
    if (seconds === 0) {
      if (min === 0) {
        console.log('min', min);
        clearInterval(counterInterval);
        clearInterval(animInterval);
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
