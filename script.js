
// point sprites code based on
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

  //window.addEventListener('keydown', function(event) {


  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
      // left arrow
      selectedAnswer--;
      moveSelector(-1);
    }
    // right arrow
    else if(event.keyCode == 39) {
      selectedAnswer++;
      moveSelector(+1);
    }else if(event.keyCode == 38){
      questionSprites[0].moveDown();
    }else if(event.keyCode == 40){
      questionSprites[0].moveUp();
    }else if(event.keyCode == 32){
      // space
      launchSelectedAnswer();
    }
    
  });
}


function launchSelectedAnswer(){
   let selectedAnswer = getSelectedAnswer();
   var _this = this;
  if(selectedAnswer != null){
      console.log(selectedAnswer.question);

      for (let index = 0; index < questionSprites.length; index++) {
        if(questionSprites[index].data == selectedAnswer.question){
          //questionSprites[index].releasePoints();
          //selectedAnswer.releasePoints();
          questionSprites[index].isDone = true

          let questionSprite = questionSprites[index];
          selectedAnswer.onMoveDone = (sprite) => {
              console.log("+++ tween");
              sprite.releasePoints();
              questionSprite.releasePoints();
              _this.setNewSpriteQuestion(questionSprite);
             questionSprite.startMoving();

          };
          selectedAnswer.movePointsTo(questionSprites[index]);

//          selectedAnswer.animateToTarget();

  //        selectedAnswer.isFreeMovement = true;
//          questionSprites[index].explode();



        }
      }

  }
}


function getSelectedAnswer(){
  if(selectedAnswer < 0){
    return null;
  }
  if(selectedAnswer >= answerSprites.length){
    return null;
  }
  return answerSprites[selectedAnswer];
}

function moveSelector(direction){
  // modulate selected answer
  selectedAnswer = selectedAnswer % answerSprites.length;


 for (let index = 0; index < answerSprites.length; index++) {
    answerSprites[index].x += 100*direction;
    answerSprites[index].animateToTarget(0.14);
    //answerSprites[index].updatePoints(false);
 }





  console.log(selectedAnswer);
  for (let index = 0; index < answerSprites.length; index++) {
    if(index != selectedAnswer){
      answerSprites[index].setColorHue(-1);
      answerSprites[index].scale = 1;
      //answerSprites[index].updatePoints(false);
    }else{
      answerSprites[index].setColorHue(0.5);
      answerSprites[index].scale = 1.5;
     // answerSprites[index].updatePoints(true);
    }    
  }


}

function createSprites(){

  // screen height
  var h = window.innerHeight;

  var question = levelManager.nextQuestion();
  //console.log(question.q);
  
  let sprite = new QuestionSprite(200,500,5,5,question.q);
  sprite.directionY = -150;
  sprite.setColorHue(-1);
  pointManager.setPoints(sprite);
  questionSprites.push(sprite);
  sprite.startMoving();
  
  question = levelManager.nextQuestion();
  let sprite2 = new QuestionSprite(400,700,6,6,question.q);
  sprite2.directionY = -75;
  pointManager.setPoints(sprite2);
  questionSprites.push(sprite2);
  sprite2.startMoving();

  for (let index = 0; index < questionSprites.length; index++) {
      questionSprites[index].updatePoints(true);
      questionSprites[index].onMoveDone = spriteMoveDone;
    }

  // set all answers
  var x = 0;
  levelManager.currentLevel.forEach(element => {
    x += 200;
    let sprite = new AnswerSprite(x,10,3,3,element.a);
    sprite.question = element.q;
    sprite.directionX= -180;

    answerSprites.push(sprite);
    pointManager.setPoints(sprite,1.5);

    sprite.updatePoints(true);
    sprite.animateToTarget();
    sprite.setColorHue(-1);

  });

}

function spriteMoveDone(sprite){
 // (sprite) => {
    console.log("done tween");
    //console.log(this);
    if(sprite.isDone){
      console.log("not moving again");
      return;
    }
    if(sprite.y < 50){
      console.log("stop moving out of screen set new sprite");
      sprite.releasePoints();
      sprite.stopMoving();

      setNewSpriteQuestion(sprite);   
      sprite.startMoving();       
    }else{
      console.log("start moving again " + sprite.isMoving);
      sprite.startMoving();
    }
//  }
}

function CheckSpriteEnd(){
 //console.log("done");
 //console.log(this.y);
}

function getCanvasHeight(){
  return canvas.height;
}

function getCanvasWidth(){
  return canvas.width;
}

function update(){


  // for (let index = 0; index < questionSprites.length; index++) {
  //   questionSprites[index].addDirection();
  //   questionSprites[index].animateToTarget();

  //   if(questionSprites[index].y < -100){
  //     var sprite = questionSprites[index];
  //     sprite.releasePoints();
  //     setNewSpriteQuestion(sprite);
  //   }
  // }


 

}

function setNewSpriteQuestion(sprite){
  sprite.stopMoving();

  var question = levelManager.nextQuestion();
  sprite.y = getCanvasHeight();
  sprite.x = getCanvasWidth() * 0.5;

  // offset left or right
  let screenMargin = getCanvasWidth() * 0.4;
  sprite.x += (Math.random()-0.5) * screenMargin;

  console.log("setnew sprite");
      
 // sprite.updatePoints(true);

  sprite.data = question.q;
  pointManager.setPoints(sprite);
  
  sprite.isDone = false;
  //sprite.updatePoints(true);
  // sprite.onMoveDone = (sprite) => {
  //   this.spriteMoveDone(sprite);
  // };
  
  console.log(sprite);
 // spriteMoveDone;

  //sprite.startMoving();

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
  // console.log("update");
  // for (let index = 0; index < answerSprites.length; index++) {
  //   let answerSprite = answerSprites[index];
  //   if(answerSprite.isFreeMovement) continue;
    
  // //  answerSprite.update();
  //   //answerSprites[index].updatePoints(true);

  //   if(answerSprite.x < -80){      
  //     let farestPoint = findLastAnswerSprite();
  //     farestPoint = Math.max(farestPoint, getCanvasWidth());
  //     answerSprite.x = farestPoint + 60;
  //     answerSprite.updatePoints(true);
  //   }
  // }
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
  
  //console.log(pointManager.points);
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
//let anserTimer = setInterval(answerSliderUpdate, 2000);

