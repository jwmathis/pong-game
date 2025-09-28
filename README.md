Access the Game here: https://jwmathis.github.io/pong-game/

## Project Documentation: Canvas Pong Game
### 1. Overview
This is a modern, responsive implementation of the classic Pong arcade game, built entirely using HTML5 Canvas and vanilla JavaScript. The project follows the Model-View-Controller (MVC) architectural pattern to ensure clean separation of game logic, rendering, and input handling.

### 2. Architecture: Model-View-Controller (MVC)

The game is structured into distinct modules for easy maintenance and scaling:

| File | Role | Responsibility |
|---|---|---|
| src/js/model.js | Model | Holds the central game state (gameState), manages physics, ball movement, collision detection, and score updates. |
| src/js/view.js | View | Handles all rendering tasks, drawing the game state (ball, paddles, score) onto the HTML Canvas. Also manages responsive resizing. |
| src/js/controller.js | Controller | Manages the game loop (requestAnimationFrame), processes user input (W/S keys), manages AI updates, and coordinates data flow between the Model and View. |
| src/js/main.js | Entry Point | Initializes the application, sets up global event listeners (keys, button clicks), and starts the game. |
| src/js/audio.js | Audio Manager | Loads and plays sound effects (using .mp3 format) and handles the crucial browser audio unlock mechanism upon user interaction. |

### 3. Core Features

| Feature | Implementation Detail |
|---|---|
| Difficulty Select | Three UI buttons (Easy, Medium, Hard) set the computerPaddle.speed within the Model, providing scalable challenge. |
| Score Tracking | Scores are tracked in the Model and rendered dynamically on the Canvas by the View. |
| Game Reset | Handled by a dedicated button and the 'R' keyboard key, which calls resetScoreAndPositions() in the Model. |
| Responsive Design | The Canvas uses percentage-based width and CSS aspect-ratio (16:9), ensuring optimal display on all screen sizes. |

### 4. Running the Project
Server Requirement: Due to the use of JavaScript modules (import/export), the game must be run from a local HTTP server (e.g., Python's http.server or WebStorm's built-in server).
Controls: Use the W and S keys to move the player paddle.
