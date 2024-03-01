
// based on
// https://codepen.io/AzazelN28/pen/zvXZQw

  let angle = 0.0
  let isDirty = true
  let frameID
  let lastFrameTime = 0.0
  let levelManager = new LevelManager()

  let toggle = true


  let pointManager = new PointManager(document.getElementById("drawCanvas"));
  let questionSprites = [];
  let answerSprites = [];

  let selectedAnswer = -1;

loadShaders("vertex.glsl","fragment.glsl",function(){
    isSetupDone = true;
    createSprites();
    frameID = window.requestAnimationFrame(render);
    setupHandlers();
});


function setupHandlers(){
  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
      // left arrow
      selectedAnswer--;
      moveSelector();
    }
    else if(event.keyCode == 39) {
      selectedAnswer++;
      moveSelector();
    }else if(event.keyCode == 38){
      questionSprites[0].moveDown();
    }else if(event.keyCode == 40){
      questionSprites[0].moveUp();
    }
    
  });
}


function moveSelector(){
  // modulate selected answer
  selectedAnswer = selectedAnswer % answerSprites.length;

  for (let index = 0; index < answerSprites.length; index++) {
    if(index != selectedAnswer){
      answerSprites[index].setColorHue(-1);
    }else{
      answerSprites[index].setColorHue(0.5);
    }
  }


}

function createSprites(){

  // screen height
  var h = window.innerHeight;

  var question = levelManager.nextQuestion();
  console.log(question.q);
  
  let sprite = new Sprite(200,h,5,5,question.q);
  sprite.directionY = -150;
  pointManager.setPoints(sprite);
  questionSprites.push(sprite);
  
  question = levelManager.nextQuestion();
  let sprite2 = new Sprite(400,1200,6,6,question.q);
  sprite2.directionY = -75;
  pointManager.setPoints(sprite2);
  questionSprites.push(sprite2);


  // set all answers
  var x = 0;
  levelManager.currentLevel.forEach(element => {
    x += 200;
    let sprite = new Sprite(x,10,3,3,element.a);
    sprite.directionX= -180;

    answerSprites.push(sprite);
    pointManager.setPoints(sprite,1.5);

    sprite.updatePoints(true);
    sprite.setColorHue(-1);

  });


  for (let index = 0; index < questionSprites.length; index++) {
    questionSprites[index].updatePoints(true);
 }


}

function getCanvasHeight(){
  return canvas.height;
}

function getCanvasWidth(){
  return canvas.width;
}

function update(){


  for (let index = 0; index < questionSprites.length; index++) {
    questionSprites[index].update();

    if(questionSprites[index].y < -100){
      var sprite = questionSprites[index];
      sprite.releasePoints();
      setNewSpriteQuestion(sprite);
    }
  }


 

}

function setNewSpriteQuestion(sprite){
  var question = levelManager.nextQuestion();
  sprite.y = getCanvasHeight();
  sprite.x = getCanvasWidth() * 0.5;

  // offset left or right
  let screenMargin = getCanvasWidth() * 0.1;
  sprite.x += (Math.random()-0.5) * screenMargin;

  console.log(sprite.x);
      
  sprite.updatePoints(true);

  sprite.data = question.q;
  pointManager.setPoints(sprite);
  sprite.updatePoints(true);
}


function findLastAnswerSprite(){
  let last = -1000;
  for (let index = 0; index < answerSprites.length; index++) {
    if(answerSprites[index].x > last){
      last = answerSprites[index].x;
    }
  }

  return last;
}


function answerSliderUpdate(){
  for (let index = 0; index < answerSprites.length; index++) {
    answerSprites[index].update();
    //answerSprites[index].updatePoints(true);

    if(answerSprites[index].x < -200){
      var sprite = answerSprites[index];
      sprite.x = findLastAnswerSprite() + 200;
      sprite.updatePoints(true);
    }
  }
}


function render(now) {

  if (canvas.width !== canvas.clientWidth) {
    canvas.width = canvas.clientWidth
    isDirty = true
  }
  
  if (canvas.height !== canvas.clientHeight) {
    canvas.height = canvas.clientHeight
    isDirty = true
  }

  if(isSetupDone){
   



  if (isDirty) {
    gl.viewport(0, 0, canvas.width, canvas.height)
    mat4.perspective(pMatrix, Math.PI * 0.35, canvas.width / canvas.height, 0.01, 1000.0)
    // set ortho matrix
    mat4.ortho(pMatrix, 0, canvas.width,0, canvas.height, 0.01, 1000.0)
    console.log("projection");
    isDirty = false
  }
  
  angle += 0.0005
  
  mat4.identity(vMatrix)  
  mat4.multiply(mvpMatrix, pMatrix, mvMatrix)
  
  gl.uniformMatrix4fv(uniforms.mvp, false, mvpMatrix)
  
  setPointsBuffer(pointManager.points);
  gl.drawArrays(gl.POINTS, 0, NUM_POINTS)
  

  let now = Date.now();
  let diff = now - lastFrameTime;
  lastFrameTime = now;
  let fps = 1000./diff;
  fps = Math.round(fps);

  let debug = document.getElementById("debug");
  debug.innerHTML = fps;

}

frameID = window.requestAnimationFrame(render)

 
  
}


gameTimer = setInterval(update, 3000);
let anserTimer = setInterval(answerSliderUpdate, 2000);





function SetCanvas(){

  pointManager.freeParticles();

     // const ctx2 = document.getElementById("canvas2").getContext("2d");


  }


