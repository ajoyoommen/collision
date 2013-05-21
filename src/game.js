function square(number)
{
  return number * number;
}

function collision()
{
  bluecx = objBlueBall.cx();
  bluecy = objBlueBall.cy();
  redcx = objRedBall.cx();
  redcy = objRedBall.cy();
  dist = Math.sqrt(square((redcx - bluecx)) + square((redcy - bluecy)));
  if(dist <= 20)
  {
    window.collBR = true;
    return true;
  }
  else
  {
    window.collBR = false;
    return false;
  }
}

function moveRed()
{
  
  x = objRedBall.x + objRedBall.vx * objRedBall.sp;
  y = objRedBall.y + objRedBall.vy * objRedBall.sp;
  right = objRedBall.w + x;
  if(right > canvas.width)
  {
    diff = right - canvas.width;
    objRedBall.vx = -1;
    x -= diff; 
  }
  else if(x < 0)
  {
    diff = 0 - x;
    objRedBall.vx = 1;
    x += diff; 
  }
  else if(window.collBR)
  {
    objRedBall.vx *= -1;
    x = objRedBall.x + objRedBall.vx * objRedBall.sp;
  }
  objRedBall.x = x;
  objRedBall.y = y;
}

function update() 
{ 
  //Create the animation loop
  collision();
  moveRed();
  window.requestAnimationFrame(update, canvas); 
  render(); 
} 

function render() 
{ 
  //Clear the previous animation frame
  surface.clearRect(0, 0, canvas.width, canvas.height);
  //Loop through all the sprites in the "sprites" array and use their properties to display them
  if(sprites.length !== 0)
  { 
    for(var i = 0; i < sprites.length; i++) 
    { 
      switch(i)
      {
        case 0:
          var sprite = sprites[i]; 
          surface.drawImage 
          ( 
            imgRedBall, 
            sprite.srcX, sprite.srcY, 
            sprite.srcW, sprite.srcH, 
            Math.floor(sprite.x), Math.floor(sprite.y), 
            sprite.w, sprite.h 
          );
          break;
        case 1:
          var sprite = sprites[i]; 
          surface.drawImage 
          ( 
              imgBlueBall, 
              sprite.srcX, sprite.srcY, 
              sprite.srcW, sprite.srcH, 
              Math.floor(sprite.x), Math.floor(sprite.y), 
              sprite.w, sprite.h 
        );
      }
    } 
  } 
}

function move(mousex, mousey)
{
  if(!window.collBR)
  {
    objBlueBall.x = mousex - objBlueBall.w/2;
    objBlueBall.y = mousey - objBlueBall.h/2;
  }
}

function mousemoveHandle(event)
{
  mouseX = event.pageX - canvas.offsetLeft;
  mouseY = event.pageY - canvas.offsetTop;
  move(mouseX, mouseY);
  distdiv = document.getElementById("dtag");
  distdiv.innerHTML = "Blue(" + bluecx + "," + bluecy + ") Red(" + redcx + "," + redcy + ") Distance is : " + dist;
}

function loadImage() 
{ 
  //Update the sprite as soon as the image has been loaded
  update(); 
}

window.collBR = false;
canvas = document.getElementById("cv");
canvas.style.cursor = "none";
surface = canvas.getContext("2d");
//--- The sprite object

var sprite = 
{ 
  //The X and Y source position of the sprite's image and its height and width
  srcX: 0, 
  srcY: 0, 
  srcW: 0, 
  srcH: 0, 
  //The X and Y position of the sprite on the canvas as well as its height
  x: 0, 
  y: 0, 
  w: 10, 
  h: 10,
  
  //Direction Vectors
  vx: 0,
  vy: 0,
  //Magnitude
  sp: 1,
  //Getters
  cx: function()
  {
    return this.x + (this.w / 2);
  },
  cy: function()
  {
    return this.y + (this.h / 2);
  },
  left: function()
  {
    return this.x;
  },
  right: function()
  {
    return this.x + this.w;
  },
  top: function()
  {
    return this.y;
  },
  bottom: function()
  {
    return this.y + this.h;
  }
}; 
//An array to store the game sprites
var sprites = []; 
//Create the sprite.

//Center it on the canvas and push it into the sprites array
var objRedBall = Object.create(sprite);
objRedBall.x = canvas.width / 2;
objRedBall.y = canvas.height / 2;
objRedBall.w = 20;
objRedBall.h = 20;
objRedBall.srcW = 400;
objRedBall.srcH = 400;
objRedBall.vx = 1;
sprites.push(objRedBall);

//Load the sprite image
var imgRedBall = new Image(); 
imgRedBall.addEventListener("load", loadImage, false); 
imgRedBall.src = "../images/red.png"; 

var objBlueBall = Object.create(sprite);
objBlueBall.x = 100;
objBlueBall.y = 0;
objBlueBall.w = 20;
objBlueBall.h = 20;
objBlueBall.srcW = 400;
objBlueBall.srcH = 400;
sprites.push(objBlueBall);

var imgBlueBall = new Image();
imgBlueBall.addEventListener("load", loadImage, false);
imgBlueBall.src = "../images/blue.png";

canvas.addEventListener("mousemove",mousemoveHandle, false);
