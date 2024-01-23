


  let angle = 0.0
  let isDirty = true
  let frameID
  let lastFrameTime = 0.0


loadShaders("vertex.glsl","fragment.glsl",function(){
    isSetupDone = true;
    SetCanvas();

    frameID = window.requestAnimationFrame(render);
    setInterval(function(){
      SetCanvas();
    //  console.log("set canvas");
    },1000);
});

function render(now) {

  //SetCanvas();
 
  // const pixel = ctx2.getImageData(30, 30, 1, 1);
  // const data = pixel.data;

//  ctx2.fillRect(0, 0, 46, 35);

  //const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
  //let destination = document.getElementById("debug");
  //destination.style.background = rgbColor;


  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas


  //return;
  //console.log(ctx2);

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
    isDirty = false
  }
  
  angle += 0.0005
  
  // P * V * M
  // mat4.translate(mvpMatrix, mvpMatrix, position);
  // mat4.identity(mMatrix)
  

  position[2] = 2;// Math.sin(now / 50000)
  
  mat4.identity(vMatrix)
  mat4.translate(vMatrix, vMatrix, position)
  // mat4.rotateX(vMatrix, vMatrix, angle)
  // mat4.rotateY(vMatrix, vMatrix, angle)
  // mat4.rotateZ(vMatrix, vMatrix, angle)
  
  mat4.invert(ivMatrix, vMatrix)
  
  mat4.multiply(mvMatrix, ivMatrix, mMatrix)
  mat4.multiply(mvpMatrix, pMatrix, mvMatrix)
  
  gl.uniformMatrix4fv(uniforms.mvp, false, mvpMatrix)
  gl.drawArrays(gl.POINTS, 0, NUM_POINTS)
  

  let now = Date.now();
  let diff = now - lastFrameTime;
  lastFrameTime = now;
  let fps = 1000./diff;
  fps = Math.round(fps);

  let debug = document.getElementById("debug");
  debug.innerHTML = fps;

   updatePoints();
}

  frameID = window.requestAnimationFrame(render)

 
  
}

function FreeParticles(){
  for (let index = 0; index < NUM_POINTS; index++) {
    points[index].isFree = true;
  }
}


function SetCanvas(){

  FreeParticles();

      const ctx2 = document.getElementById("canvas2").getContext("2d");
      ctx2.font = "48px serif";

      ctx2.fillStyle = '#000000';
      ctx2.fillRect(0, 0, 400, 400);
      
      ctx2.fillStyle = '#FFFFFF';
    
      const d = new Date();
      let seconds = d.getSeconds();

      let minutes = d.getMinutes();

      //minutes = 60;

      let xOffs = -4+ minutes/8.0;
      let yOffs = -1 ;
        

      let text = Date.now();
      ctx2.fillText(seconds, 0, 35);

    for(let x=0;x<77;x++){
      for(let y=0;y<35;y++){
        const pixel = ctx2.getImageData(x, y, 1, 1);
        const data = pixel.data;
        if( data[0] > 0.7){
          SetFreePoint((x/46) + xOffs,1.0-(y/35)+ yOffs);
        }
      }
    }

  }


