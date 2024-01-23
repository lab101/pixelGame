


  let angle = 0.0
  let isDirty = true
  let frameID


loadShaders("vertex.glsl","fragment.glsl");

function render(now) {

  const ctx2 = document.getElementById("canvas2").getContext("2d");
  ctx2.font = "48px serif";

  ctx2.fillStyle = '#FF0000';
  ctx2.fillRect(0, 0, 400, 400);
  
  ctx2.fillStyle = '#FFFFFF';
  ctx2.fillText("Hello world", 10, 50);

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
  


  updatePoints();

  frameID = window.requestAnimationFrame(render)

 

  
}

frameID = window.requestAnimationFrame(render)
