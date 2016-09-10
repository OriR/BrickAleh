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
      context.fillStyle = 'black';
      context.strokeStyle = 'black';
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
      return {
        x: boardWidth / 2,
        y: boardHeight - playerBaseLine,
        radius: ballRadius,
        speedx: 0,
        speedy: 0,
        render: function(){
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          context.fill();
        },
        update: function(){
          if(!hasStarted)
            return;

          this.x += this.speedx;
          this.y += this.speedy;
        },
        setSpeed: function(x, y){
          this.speedx = x;
          this.speedy = y;
        }
      };
    }

    /**
     * Creates a new player object (the paddle) with initial values
     */
    function createPlayer() {
      return {
        x: boardWidth / 2,
        y: boardHeight - (playerBaseLine - ballRadius),
        width: 100,
        height: 10,
        speedX: 0,
        isInBoard: true,
        render: function(){
          context.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
        },
        bottom: function(){
          return this.y + this.height;
        },
        top: function(){
          return this.y;
        },
        left: function(){
          return this.x - this.width / 2;
        },
        right: function(){
          return this.x + this.width / 2;
        },
        update: function(){
          this.x += this.speedX;

          if(this.x + this.width / 2 >= boardWidth){
            this.x = boardWidth - this.width / 2;
            this.setSpeed(0);
          }

          if(this.x - this.width / 2 <= 0){
            this.x = this.width / 2;
            this.setSpeed(0);
          }
        },
        setSpeed: function(x){
          if(x !== 0){
            var direction = Math.abs(x)/x;
            this.speedX = Math.floor(Math.min(Math.abs(x), 35)) * direction;
          }
          else{
            this.speedX = 0;
          }
        }
      };
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
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      resetContextStyle();
      context.strokeRect(0, 0, boardWidth, boardHeight);
    }

    /**
     * Refreshes the game to the new frame on the canvas
     */
    function refresh(){
      clearCanvas();
      objects.forEach(function(object){
        object.render();
        object.update();
      });
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
      hasStarted = false;
      ball = createBall();
      player = createPlayer();

      objects.shift();
      objects.shift();
      objects.unshift(ball);
      objects.unshift(player);
    }

    /**
     * Initialize the game loop so that it will draw a new frame and update everything.
     */
    function init(){
      // Placeholders for the player and ball.
      objects = [{}, {}];
      resetPlayerAndBall();
      addBricks();

      if (gameLoopHandler){
        clearInterval(gameLoopHandler);
      }

      gameLoopHandler = setInterval(refresh, 40);
    }

    // Start the game!
    init();
}
