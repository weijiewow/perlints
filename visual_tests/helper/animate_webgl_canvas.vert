#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

in vec4 aVertexPosition;
in vec4 aVertexColor;
uniform mat4 uMvpMatrix;
out vec4 vColor;

void main(void) {
  gl_Position = uMvpMatrix * aVertexPosition;
  gl_PointSize = 1.0;
  vColor = aVertexColor;
}