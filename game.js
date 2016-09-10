window.onload = function(){
    var canvas = document.getElementById('board');
    var context = canvas.getContext('2d');
    var hasStarted = false;
    var brickWidth = 60;
    var brickMargin = 10;
    var playerBaseLine = 50;
    var ballRadius = 10;
    var lives = [];
    var bricks = [];
    var boardWidth;
    var boardHeight;
    var objects;
    var ball;
    var player;
    var actions;
    var gameLoopHandler;

    canvas.width = 1024;
    canvas.height = 576;

    boardHeight = canvas.height - 50;
    boardWidth = canvas.width;

    /**
     * Resets the style of the canvas context for drawing
     */
    function resetContextStyle(){

    }

    /**
     * Takes an array and an index and removes that item from the given array
     * and the objects array.
     */
    function removeFrom(array, index){

    }

    /**
     * Creates a new ball object with initial values
     */
    function createBall(){

    }

    /**
     * Creates a new player object (the paddle) with initial values
     */
    function createPlayer() {

    }

    /**
     * Creates a new brick object at a given X, Y coordinates
     */
    function createBrick(x, y){

    }

    /**
     * Creates a new heart object that will represent a players life
     * at a given X position with a fixed Y position
     */
    function createHeart(x){

    }

    /**
     * Clears the entire canvas for redrawing
     */
    function clearCanvas(){

    }

    /**
     * Refreshes the game to the new frame on the canvas
     */
    function refresh(){

    }

    // Describing all the actions that the player can do in the game
    actions = {
      // Left (37 - Right arrow)
      37: function(){

      },
      // Right (39 - Right arrow)
      39: function(){

      },
      // Start game (13 - Enter)
      13: function(){

      }
    };

    // 32 - Space
    actions[32] = actions[13];

    /**
     * Handles a keydown event and what happens each time
     */
    window.addEventListener('keydown', function(event){

    });

    /**
     * Handles a keyup event and what happens each time
     */
    window.addEventListener('keyup', function(event){
      
    });

    /**
     * Add all the bricks to the board
     */
    function addBricks(){

    }

    /**
     * Resets the player and the ball to their starting positions.
     * Also, when given a number of lives, creates the appropriate amount of hearts for the player.
     */
    function resetPlayerAndBall(numberOfLives){

    }

    /**
     * Initialize the game loop so that it will draw a new frame and update everything.
     */
    function init(){

    }

    // Start the game!
    init();
}
