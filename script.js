let images = {};
let loadedImage = 0;

for (let i = 0; i < 10; i++) {
  images[i] = [];
  for (let j = 0; j < 2; j++) {
    const src = `assets/${i}_${j}.png`;
    let image = new Image();
    image.src = src;
    image.onload = () => {
      loadedImage += 1;
      loaderPercentage.textContent =
        Math.round(Math.floor((loadedImage / 20) * 100)) + '%';
      if (loadedImage === 20) {
        loader.style.display = 'none';
      }
    };
    images[String(i)].push(src);
  }
}

const ANIMATION_INTERVAL_MS_SECOND = 500; // in milliseconds
let currentFrame = 0;
let min = 0;
let seconds = 0;
let isPlaying = false;
let isPaused = false;
let animationInterval;
let counterInterval;

startBtn.onclick = () => {
  if (loadedImage < 20) {
    return;
  }
  if (!isPaused) {
    seconds = Number(secondsCountdown.value);
    min = 0;
  }
  if (seconds === 0) {
    alert("You haven't entered any number yet.");
    return;
  }
  isPlaying = true;
  isPaused = false;
  startBtn.textContent = 'Start';
  startCountDown();
};

resetBtn.onclick = () => {
  if (loadedImage < 20) {
    return;
  }
  isPaused = false;
  isPlaying = false;
  seconds = 0;
  secondsCountdown.value = 0;
  startBtn.textContent = 'Start';
  clearInterval(animationInterval);
  clearInterval(counterInterval);
  showAnimation(0, [min1, min2]); // from id
  showAnimation(0, [second1, second2]); // from id
};

stopBtn.onclick = () => {
  if (loadedImage < 20) {
    return;
  }
  if (isPlaying && !isPaused) {
    clearInterval(animationInterval);
    clearInterval(counterInterval);
    startBtn.textContent = 'Resume';
    isPaused = true;
    isPlaying = false;
  } else {
    alert('Please start first');
  }
};

function startCountDown() {
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
  }, ANIMATION_INTERVAL_MS_SECOND);

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
