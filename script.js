
// based on
// https://codepen.io/AzazelN28/pen/zvXZQw

  let angle = 0.0
  let isDirty = true
  let frameID
  let lastFrameTime = 0.0

  let toggle = true


  let pointManager = new PointManager(document.getElementById("drawCanvas"));
  let sprites = [];

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
      sprites[0].moveLeft();
    }
    else if(event.keyCode == 39) {
      // right arrow
      sprites[0].moveRight();
    }else if(event.keyCode == 38){
      sprites[0].moveDown();
    }else if(event.keyCode == 40){
      sprites[0].moveUp();
    }
    

  });
}

function createSprites(){
  let sprite = new Sprite(0,0,1.5,1.5,"22");
  pointManager.setPoints(sprite);
  sprites.push(sprite);

  let sprite2 = new Sprite(-1,0,1,1,"9x3");
  pointManager.setPoints(sprite2);
  sprites.push(sprite2);
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
   
    for (let index = 0; index < sprites.length; index++) {
      sprites[index].update();
    }
    
  if (isDirty) {
    gl.viewport(0, 0, canvas.width, canvas.height)
    mat4.perspective(pMatrix, Math.PI * 0.35, canvas.width / canvas.height, 0.01, 1000.0)
    isDirty = false
  }
  
  angle += 0.0005
  
  // P * V * M
  // mat4.translate(mvpMatrix, mvpMatrix, position);
  // mat4.identity(mMatrix)
  

  position[2] = 3;// Math.sin(now / 50000)
  
  mat4.identity(vMatrix)
  mat4.translate(vMatrix, vMatrix, position)
  // mat4.rotateX(vMatrix, vMatrix, angle)
  // mat4.rotateY(vMatrix, vMatrix, angle)
  // mat4.rotateZ(vMatrix, vMatrix, angle)
  
  mat4.invert(ivMatrix, vMatrix)
  
  mat4.multiply(mvMatrix, ivMatrix, mMatrix)
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




function SetCanvas(){

  pointManager.freeParticles();

     // const ctx2 = document.getElementById("canvas2").getContext("2d");


  }


