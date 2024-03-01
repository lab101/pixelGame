precision mediump float;

uniform mat4 u_mvp;

attribute vec3 a_position;

varying float v_w;
varying float v_hue;

void main(void) {


  vec4 finalPosition = u_mvp * vec4(a_position.x,a_position.y,0.0, 1.0);
  finalPosition.z = 0.0;

  gl_Position = finalPosition;
  v_w = 1.0 / finalPosition.w;
  v_hue = a_position.z;
  gl_PointSize = 8.0;

 // if (gl_Position.w > 0.0) {
 //   gl_PointSize = 4.0;// s / gl_Position.w;
 // } else {
 // }
}