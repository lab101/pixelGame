
precision highp float;

varying float v_w;
varying float v_hue;

const vec4 begin = vec4(0.1, 0.75, 1.0, 1.0);
const vec4 end = vec4(1.0, 1.0, 1.0, 1.0);

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 interpolate4f(vec4 a,vec4 b, float p) {
  return p * b + (1.0 - p) * a;
}

void main(void) {

  vec2 pc = (gl_PointCoord - 0.5) * 2.0;

  float dist = (.80 - sqrt(pc.x * pc.x + pc.y * pc.y));
  dist = smoothstep(0.2, 1.0, dist);
  //vec4 color = interpolate4f(begin, end, dist);

// hue to rgb

vec3 rgb;
if(v_hue < 0.0){
  rgb = vec3(1.0, 1.0, 1.0);
}else{
  vec3 hsb = vec3(v_hue, 1.0, 1.0);
  rgb = hsv2rgb(hsb);  
}
  
  rgb = rgb * dist;



  gl_FragColor = vec4(rgb.r, rgb.g,rgb.b, 1);

  //gl_FragColor = vec4(dist, dist, dist, dist) * color;

}