import * as Controller from './controller.js';

document.addEventListener('keydown', Controller.handlePlayerInput);

window.onload = Controller.startGame;