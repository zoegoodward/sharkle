'use strict';

// create objects
let sharkle = document.getElementById('sharkle');
let hey = document.getElementById('hey');

// Sharkle optional variables
let colour = 'white';
let direction = 'left';

// create array of audio files
let audio = [new Audio('./audio/greeting_0.wav'),
  new Audio('./audio/greeting_1.wav'),
  new Audio('./audio/greeting_2.wav'),
  new Audio('./audio/greeting_3.wav'),
  new Audio('./audio/greeting_4.wav'),
  new Audio('./audio/greeting_5.wav'),
  new Audio('./audio/greeting_6.wav'),
  new Audio('./audio/greeting_7.wav')];

// number of audio files
let min = 0;
let max = audio.length - 1;

// random interger function
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// change the direction of Sharkle
const invertDirection = () => {
  if (direction == 'left') {
    direction = 'right';
    sharkle.style.webkitTransform = 'scaleX(-1)';
    sharkle.style.transform = 'scaleX(-1)';
  } else {
    direction = 'left';
    sharkle.style.webkitTransform = '';
    sharkle.style.transform = '';
  }
};

// change the colour of Sharkle
const invertColour = () => {
  if (colour == 'white') {
    colour = 'black';
    sharkle.style.animationName = colour+'_idle';
    hey.style.animationName = colour+'_bubble';
  } else {
    colour = 'white';
    sharkle.style.animationName = colour+'_idle';
    hey.style.animationName = colour+'_bubble';
  }
};

// initiate sound and waving Sharkle on click
sharkle.onclick = () => {
  //play audio
  let i = randInt(min, max);
  audio[i].play();
  // debugging
  console.log(`number of audio file selected ${i}`);
      
  // waving Sharkle
  sharkle.style.animationDuration = '0.3s';
  sharkle.style.animationName = colour+'_wave';
  hey.style.visibility = 'visible';

  audio[i].addEventListener('ended', () => {
    sharkle.style.animationDuration = '0.6s';
    sharkle.style.animationName = colour+'_idle';
    hey.style.visibility = 'hidden';
  });
}; 