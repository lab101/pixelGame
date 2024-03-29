const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')


const { mat2, mat2d, mat4, mat3, quat, quat2, vec2, vec3, vec4 } = glMatrix;


const program = gl.createProgram()

const pointsData = []
const buffer = gl.createBuffer()


const pMatrix = mat4.create()
const vMatrix = mat4.create()
const ivMatrix = mat4.create()
const mMatrix = mat4.create()
const mvMatrix = mat4.create()
const mvpMatrix = mat4.create()
const position = vec3.create()
let attributes = {};
let uniforms = {};

let isSetupDone = false;


function loadShaders(vertextShaderFileName,fragmentShaderFileName,callback){
    //load vertex shader from server
    fetch(vertextShaderFileName)
    .then(response => response.text())
    .then(source => {
        setupVertexShader(source);    
    })
    .then(() => {
        loadFragmentShader(fragmentShaderFileName,function(){
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program))
            }
            setup();
            callback();
        });
    })

}



  function setupVertexShader(source) {
    //console.log(source);
    vertexShader = gl.createShader(gl.VERTEX_SHADER)
     gl.shaderSource(vertexShader, source)
     gl.compileShader(vertexShader)
     if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
       console.error(gl.getShaderInfoLog(vertexShader))
     }

     gl.attachShader(program, vertexShader)
  }


  function loadFragmentShader(fragmentShaderFileName,callback) {
    fetch(fragmentShaderFileName)
    .then(response => response.text())
    .then(source => {
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, source)
  
      gl.compileShader(fragmentShader)
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader))
      }
  
      gl.attachShader(program, fragmentShader)
     
      callback();
    })
  }






function setPointsBuffer(points) {

    let arrayIndex = 0;
    for(let i = 0; i < points.length; i++){

        //points[i].update();
        if(!points[i].isFree){
       //   console.log(points[i].x + " - " + points[i].y);
          pointsData[arrayIndex++] =  points[i].x;
          pointsData[arrayIndex++] =  points[i].y;
          pointsData[arrayIndex++] =  points[i].hue;
        }else{
          pointsData[arrayIndex++] =  0;
          pointsData[arrayIndex++] =  0;
          pointsData[arrayIndex++] =  -1;
        }
  //  }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsData), gl.DYNAMIC_DRAW);

}



function setup() {
    console.log("setup");
  
    attributes = {
      position: gl.getAttribLocation(program, 'a_position')
    };
    uniforms = {
      mvp: gl.getUniformLocation(program, 'u_mvp')
    };
  
  
    setPointsBuffer(pointManager.points);
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsData), gl.DYNAMIC_DRAW);
  
    //updatePoints();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    gl.useProgram(program);
  
    gl.enableVertexAttribArray(attributes.position);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);
  
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  
    const pMatrix = mat4.create();
    const vMatrix = mat4.create();
    const ivMatrix = mat4.create();
    const mMatrix = mat4.create();
    const mvMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    const position = vec3.create();
  
  
    mat4.perspective(pMatrix, Math.PI * 0.35, canvas.width / canvas.height, 0.01, 100000.0);
  
    vec3.set(position, 0.0, 0.0, 0.0);

    isSetupDone = true;
    return { pMatrix, position, vMatrix, ivMatrix, mvMatrix, mMatrix, mvpMatrix, uniforms };
  }