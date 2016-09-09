window.onload = function(){
    var canvas = document.getElementById('board');
    var context = canvas.getContext('2d');
    var brickWidth = 60;
    var brickMargin = 10;
    var objects;
    var ball;
    var player;

    canvas.width = 1024;
    canvas.height = 576;

    // Talking about closures, anything that was declared outside of a function is accessible by it.
    function resetContextStyle(){
      context.fillStyle = 'black';
      context.strokeStyle = 'black';
    }

    function createBall(){
      return {
        x: canvas.width / 2,
        y: canvas.height - 50,
        radius: 10,
        speedx: 0,
        speedy: 0,
        // Talking about attaching functions to objects and using "this"
        render: function(){
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          context.fill();
        },
        checkWallCollision: function(axis, boundry){
          // Talking about objects as dictionaries
          if(this[axis] + this.radius >= boundry){
            this[axis] = boundry - this.radius;
            this['speed' + axis] = -this['speed' + axis];
          }
          else if(this[axis] - this.radius <= 0){
            this[axis] = this.radius;
            this['speed' + axis] = -this['speed' + axis];
          }
        },
        checkCollision: function(object){
          function between(center, range, min, max){
            return (center - range >= min && center - range <= max) ||
                   (center + range >= min && center + range <= max);
          }

          // Check that either the top or bottom part of the ball are between the top and bottom of the player.
          // And that the left and right of the ball are between the left and right of the player.
          if(between(this.y, this.radius, object.top(), object.bottom()) &&
             between(this.x, this.radius, object.left(), object.right())){
               var normalizedSpeedX = Math.floor((this.x - object.x) * 20 / (this.radius + object.width / 2));

               // Talking about calling functions on objects.
               this.setSpeed(normalizedSpeedX, -this.speedy);
               object.collidedWithBall();
          }
        },
        update: function(){
          this.x += this.speedx;
          this.y += this.speedy;
          this.checkWallCollision('x', canvas.width);
          this.checkWallCollision('y', canvas.height);

          // Talking about context, and what happens to callbacks and their context.
          var actualBall = this;

          objects.forEach(function(object){
            // Talking about the equality operator
            if(object !== actualBall){
              actualBall.checkCollision(object);
            }
          });
        },
        setSpeed: function(x, y){
          this.speedx = x;
          this.speedy = y;
        }
      };
    }

    function createPlayer() {
      return {
        x: canvas.width / 2,
        y: canvas.height - 40,
        width: 80,
        height: 10,
        speedX: 0,
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

          if(this.x + this.width / 2 >= canvas.width){
            this.x = canvas.width - this.width / 2;
            this.setSpeed(0);
          }

          if(this.x - this.width / 2 <= 0){
            this.x = this.width / 2;
            this.setSpeed(0);
          }
        },
        setSpeed: function(x){
          this.speedX = x;
        },
        collidedWithBall: function(){ }
      };
    }

    function createBrick(x, y){
      return {
          R: Math.floor(Math.random() * 255),
          G: Math.floor(Math.random() * 255),
          B: Math.floor(Math.random() * 255),
          x: x,
          y: y,
          width: 60,
          height: 20,
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
          render: function(){
            var R = Math.floor(Math.random() * 255);
            var G = Math.floor(Math.random() * 255);
            var B = Math.floor(Math.random() * 255);
            var randomizeColor = false;

            if(randomizeColor){
              context.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
            }
            else {
              context.fillStyle = 'rgb(' + this.R + ',' + this.G + ',' + this.B + ')';
            }

            context.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
            resetContextStyle();
          },
          collidedWithBall: function(){
            objects.splice(objects.indexOf(this), 1);
          },
          update: function(){}
      };
    }

    function clearCanvas(){
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      resetContextStyle();
      context.strokeRect(0, 0, canvas.width, canvas.height);
    }

    function refresh(){
      clearCanvas();
      objects.forEach(function(object){
        object.render();
        object.update();
      });
    }

    var hasStarted = false;
    var frictionHandler;
    function clearFrictionHandler(){
      clearInterval(frictionHandler);
      frictionHandler = undefined;
    }

    // Talking about objects as dictionaries - continue.
    // Since it's a dictionary, a number is also acceptable.
    var actions = {
      // Left (37 - Right arrow)
      37: function(){
        if(hasStarted){
          player.setSpeed(player.speedX - 3);
          clearFrictionHandler();
        }
      },
      // Right (39 - Right arrow)
      39: function(){
        if(hasStarted){
          player.setSpeed(player.speedX + 3);
          clearFrictionHandler();
        }
      },
      // Start game (13 - Enter)
      13: function(){
        if(!hasStarted){
          ball.setSpeed(0, -10);
          hasStarted = true;
        }
      }
    };

    // 32 - Space
    actions[32] = actions[13];

    // Talking about event driven development
    window.addEventListener('keydown', function(event){
        // Talking about "truthy" and "falsy" values
        (actions[event.keyCode] || function(){})();
    });

    window.addEventListener('keyup', function(){
        if(!frictionHandler){
          frictionHandler = setInterval(function(){
            if(player.speedX === 0){
              clearFrictionHandler();
              return;
            }
            player.setSpeed(player.speedX > 0 ? player.speedX - 1 : player.speedX + 1);
          });
        }
    });

    var gameLoop;

    function init(){
      ball = createBall();
      player = createPlayer();
      objects = [ball, player];

      for(var brickIndex = 1; brickIndex < 104; brickIndex++){
        var x = -60 + (brickIndex * (brickWidth + brickMargin)) % canvas.width;
        if(x < brickWidth + brickMargin || canvas.width - x < brickWidth + brickMargin){
          continue;
        }
        var y = 30 + Math.floor((brickIndex * (brickWidth + brickMargin)) / canvas.width) * 30;
        objects.push(createBrick(x, y))
      }

      if (gameLoop){
        clearInterval(gameLoop);
      }

      // Talking about using functions as objects, it's basically a pointer object to a function.
      // Also talking about the event loop and one thread and a-synchronicity
      gameLoop = setInterval(refresh, 40);
    }

    init();
}
