'use strict';

// create objects
let sharkle = document.getElementById('sharkle');
let bubble = document.getElementById('bubble');

// Sharkle variables
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
    // change Sharkle direction
    sharkle.style.right = '';
    sharkle.style.left = 0; 
    sharkle.style.transform = 'scaleX(-1)';
    // change bubble direction
    bubble.style.right = 0;
    bubble.style.transform = 'scaleX(-1)'; 
    bubble.style.animationName = colour+'_bubble_'+direction;   
  } else {
    direction = 'left';
    // change Sharkle direction
    sharkle.style.right = 0;
    sharkle.style.left = '';
    sharkle.style.transform = '';
    // change bubble direction
    bubble.style.right = '';
    bubble.style.transform = ''; 
    bubble.style.animationName = colour+'_bubble_'+direction;  
  }
};

// change the colour of Sharkle
const invertColour = () => {
  if (colour == 'white') {
    colour = 'black';
    sharkle.style.animationName = colour+'_idle';
    bubble.style.animationName = colour+'_bubble_'+direction;
  } else {
    colour = 'white';
    sharkle.style.animationName = colour+'_idle';
    bubble.style.animationName = colour+'_bubble_'+direction;
  }
};

// initiate sound and waving Sharkle on click
sharkle.onclick = () => {
  //play audio
  let i = randInt(min, max);
  audio[i].play();     
  // waving Sharkle
  sharkle.style.animationDuration = '0.3s';
  sharkle.style.animationName = colour+'_wave';
  bubble.style.visibility = 'visible';
  // return to idle Sharkle after sound ended
  audio[i].addEventListener('ended', () => {
    sharkle.style.animationDuration = '0.6s';
    sharkle.style.animationName = colour+'_idle';
    bubble.style.visibility = 'hidden';
  });
}; 