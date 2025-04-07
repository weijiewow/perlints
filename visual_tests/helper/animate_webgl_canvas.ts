import fragmentSource from './animate_webgl_canvas.frag?raw';
import vertexSource from './animate_webgl_canvas.vert?raw';

/**
 * Right-to-left multiplication of 4x4 matrices
 *
 * c = a * b
 *
 * @param a - The right 4x4 matrix
 * @param b - The left 4x4 matrix
 * @param c - The resulting 4x4 matrix
 */
function matrix4Multiply(
  a: Float32Array<ArrayBuffer>,
  b: Float32Array<ArrayBuffer>,
  c: Float32Array<ArrayBuffer>,
): void {
  const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15] = a;
  const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15] = b;
  // col 1
  c[0] = (a0 * b0) + (a4 * b1) + (a8 * b2) + (a12 * b3);
  c[1] = (a1 * b0) + (a5 * b1) + (a9 * b2) + (a13 * b3);
  c[2] = (a2 * b0) + (a6 * b1) + (a10 * b2) + (a14 * b3);
  c[3] = (a3 * b0) + (a7 * b1) + (a11 * b2) + (a15 * b3);
  // col 2
  c[4] = (a0 * b4) + (a4 * b5) + (a8 * b6) + (a12 * b7);
  c[5] = (a1 * b4) + (a5 * b5) + (a9 * b6) + (a13 * b7);
  c[6] = (a2 * b4) + (a6 * b5) + (a10 * b6) + (a14 * b7);
  c[7] = (a3 * b4) + (a7 * b5) + (a11 * b6) + (a15 * b7);
  // col 3
  c[8] = (a0 * b8) + (a4 * b9) + (a8 * b10) + (a12 * b11);
  c[9] = (a1 * b8) + (a5 * b9) + (a9 * b10) + (a13 * b11);
  c[10] = (a2 * b8) + (a6 * b9) + (a10 * b10) + (a14 * b11);
  c[11] = (a3 * b8) + (a7 * b9) + (a11 * b10) + (a15 * b11);
  // col 4
  c[12] = (a0 * b12) + (a4 * b13) + (a8 * b14) + (a12 * b15);
  c[13] = (a1 * b12) + (a5 * b13) + (a9 * b14) + (a13 * b15);
  c[14] = (a2 * b12) + (a6 * b13) + (a10 * b14) + (a14 * b15);
  c[15] = (a3 * b12) + (a7 * b13) + (a11 * b14) + (a15 * b15);
}

type EventCallBack<T extends AnimateWebGlCanvas> = (webglAnimate: T) => void;

type AttribLocations = {
  vertexPosition: GLint
  vertexColor: GLint
};

type UniformLocations = {
  uMvpMatrix: WebGLUniformLocation
};

/**
 * Abstract class for an animation canvas based on WebGL2
 */
export abstract class AnimateWebGlCanvas {
  private _gl: WebGL2RenderingContext; // Rendering context
  private _program: WebGLProgram; // Shader program
  private _requestNextAnimationFrameID: number = 0; // Animation timer ID
  private _lastTimestamp: number = 0; // Used to save the timestamp of the previous frame in the animation loop
  private _colorBuffer!: WebGLBuffer; // Vertex color buffer
  private _positionBuffer!: WebGLBuffer; // Vertex position buffer
  private _pointPositions!: Float32Array<ArrayBuffer>; // Stores the positions of each vertex
  private _pointColors!: Float32Array<ArrayBuffer>; // Stores the colors of each vertex
  private _glAttribLocations: AttribLocations; // Pointers to the 'in' variables in the vertex shader
  private _glUniformLocations: UniformLocations; // Pointers to the 'uniform' variables in the vertex shader
  public mvpMat: Float32Array<ArrayBuffer> = new Float32Array(16); // Model-View-Projection transformation matrix
  public clearColor: [number, number, number, number] = [0, 0, 0, 1]; // Clear canvas color
  private _eventQueue: { [key: string]: EventCallBack<AnimateWebGlCanvas>[] } = {}; // Event queue for storing callback functions for different events
  private _playing: boolean = false; // Indicates whether the animation is playing

  constructor(
    protected _canvas: HTMLCanvasElement,
    private _vertexSource: string = vertexSource,
    private _fragmentSource: string = fragmentSource,
  ) {
    this._gl = this.createRenderingContext();
    this._program = this.createShaderProgram();
    this._gl.useProgram(this._program);
    this.initRenderingContext();

    const [
      modelMat,
      viewMat,
      projectionMat,
    ] = this.initMVPTransformation();
    // Combine the modelMat, viewMat, and projectionMat into a single matrix.
    // this.mvpMat = this.projectionMat * this.viewMat * this.modelMat
    matrix4Multiply(projectionMat, viewMat, this.mvpMat);
    matrix4Multiply(this.mvpMat, modelMat, this.mvpMat);

    this.viewportTransformation();

    const [glAttribLocations, glUniformLocations] = this.initWebGLLocations();
    this._glAttribLocations = glAttribLocations;
    this._glUniformLocations = glUniformLocations;

    this.uploadMVPToWebGL();
    this.initBuffer();
    this.setPositionAttribute();
    this.setColorAttribute();
  }

  /**
   * Get the rendering context for the drawing surface of the canvas element.
   * @returns the render context
   */
  private createRenderingContext(): WebGL2RenderingContext {
    const gl = this._canvas.getContext('webgl2');
    if (gl === null) {
      throw new Error('WebGL 2.0 not supported');
    }
    return gl;
  }

  /**
   * Set common properties of the rendering context, such as background color and depth buffer.
   */
  private initRenderingContext(): void {
    const gl = this._gl;
    gl.clearColor(...this.clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  /**
   * Get The program of the shaders.
   * @returns The program of the shaders.
   */
  private createShaderProgram(): WebGLProgram {
    const gl = this._gl;
    const program: WebGLProgram = gl.createProgram();

    const vertexShader = this.compileShader(gl.VERTEX_SHADER, this._vertexSource);
    const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, this._fragmentSource);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
      throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
    }

    return program;
  }

  /**
   * Compiles the source code of a shader.
   * @param type - The type of shader to compile.
   * @param source - The source code of the shader.
   * @returns The compiled shader.
   */
  private compileShader(type: GLenum, source: string): WebGLShader {
    const gl = this._gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
      throw new Error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
    }
    return shader;
  }

  /**
   * Configure the contents of the model, view, and projection matrices used for 2D drawing.
   */
  private initMVPTransformation(): [Float32Array, Float32Array, Float32Array] {
    const canvas = this._canvas;
    // Put the objects in the place where z = -1;
    const modelMat = new Float32Array([
      [1, 0, 0, 0], // col 1
      [0, 1, 0, 0], // col 2
      [0, 0, 1, 0], // col 3
      [0, 0, -1, 1], // col 4
    ].flat());

    // Use default camera configuration of WebGL.
    // That is, place it at (0, 0, 0), look forward along the negative z-axis, and the up direction is the y-axis.
    const viewMat = new Float32Array([
      [1, 0, 0, 0], // col 1
      [0, 1, 0, 0], // col 2
      [0, 0, 1, 0], // col 3
      [0, 0, 0, 1], // col 4
    ].flat());

    // Construct an orthogonal projection matrix to project objects in the negative z-axis direction onto a canonical cube.
    // 2D drawing only requires orthogonal projection.
    const l = 0; // left
    const r = canvas.width; // right
    const b = canvas.height; // bottom
    const t = 0; // top
    const n = 0; // near
    const f = -1000; // far

    const projectionMat = new Float32Array([
      [2 / (r - l), 0, 0, 0], // col 1
      [0, 2 / (t - b), 0, 0], // col 2
      [0, 0, -2 / (n - f), 0], // col 3
      [-(r + l) / (r - l), -(t + b) / (t - b), (n + f) / (n - f), 1], // col 4
    ].flat());

    return [modelMat, viewMat, projectionMat];
  }

  /**
   * Apply viewport transformation.
   */
  private viewportTransformation(): void {
    const canvas = this._canvas;
    const gl = this._gl;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  /**
   * Get all variable pointers from shaders.
   */
  private initWebGLLocations(): [AttribLocations, UniformLocations] {
    const gl = this._gl;
    const program = this._program;
    const glAttribLocations = <AttribLocations>{
      vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
    };
    const glUniformLocations = <UniformLocations> {
      uMvpMatrix: gl.getUniformLocation(program, 'uMvpMatrix')!,
    };
    return [glAttribLocations, glUniformLocations];
  }

  /**
   * Upload the Model-View-Projection transformation matrix to GPU.
   */
  public uploadMVPToWebGL(): void {
    const { uMvpMatrix } = this._glUniformLocations;
    const gl = this._gl;

    gl.uniformMatrix4fv(
      uMvpMatrix,
      false,
      this.mvpMat,
    );
  }

  /**
   * Configure the attribute of the positions buffer.
   */
  private setPositionAttribute(): void {
    const gl: WebGL2RenderingContext = this._gl;
    const positionBuffer: WebGLBuffer = this._positionBuffer;
    const location: number = this._glAttribLocations.vertexPosition;

    const numComponent: number = 2;
    const type: number = gl.FLOAT;
    const normalize: boolean = false;
    const stride: number = 0;
    const offset: number = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.vertexAttribPointer(
      location,
      numComponent,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(location);
  }

  /**
   * Configure the attribute of the colors buffer.
   */
  private setColorAttribute(): void {
    const gl: WebGL2RenderingContext = this._gl;
    const colorBuffer: WebGLBuffer = this._colorBuffer;
    const location: number = this._glAttribLocations.vertexColor;

    const numComponent: number = 4;
    const type: number = gl.FLOAT;
    const normalize: boolean = false;
    const stride: number = 0;
    const offset: number = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.vertexAttribPointer(
      location,
      numComponent,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(location);
  }

  public getPointPositions(): number[] {
    return [...this._pointPositions];
  }

  /**
   * Send the values to the positions buffer.
   * @param positions - The values to be send to the buffer, formatted as [x1, y1, x2, y2, ..., xn, yn].
   */
  public setPointPositions(positions: number[]): void {
    const gl = this._gl;
    this._pointPositions.set(positions, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      0,
      this._pointPositions,
    );
  }

  public getPointColors(): number[] {
    return [...this._pointColors];
  }

  /**
   * Send the values to the colors buffer.
   * @param colors - The values to be sent to the buffer, formatted as [r1, g1, b1, a1, r2, g2, b2, a2, …, rn, gn, bn, an].
   */
  public setPointColors(colors: number[]): void {
    const gl = this._gl;

    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    this._pointColors.set(colors, 0);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      0,
      this._pointColors,
    );
  }

  /**
   * Create the color and position buffers using gl.createBuffer() and configure them.
   */
  private initBuffer(): void {
    const canvas = this._canvas;
    const gl = this._gl;
    // Configure the buffer of the colors.
    this._colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(canvas.width * canvas.height * 4), gl.DYNAMIC_DRAW);
    this._pointColors = new Float32Array(canvas.height * canvas.width * 4);

    // Configure the buffer of the positions.
    this._positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(canvas.width * canvas.height * 2), gl.DYNAMIC_DRAW);
    this._pointPositions = new Float32Array(canvas.height * canvas.width * 2);
  }

  /**
   * Update the state of the animation; this function will be called before rendering.
   * @param _delta - The interval in milliseconds from the previous frame to this frame, needs to be manually passed in when rendering separately, default is 0.
   */
  protected update(_delta: number): void {};

  /**
   * Rendering
   * @param _canvas - Target canvas.
   * @param _gl - Rendering context.
   * @param _delta - The interval in milliseconds from the previous frame to this frame, needs to be manually passed in when rendering separately, default is 0.
   */
  protected render(_canvas: HTMLCanvasElement, _gl: WebGL2RenderingContext, _delta: number): void {};

  private _tick(timestamp: number): void {
    const lastTimestamp = this._lastTimestamp;
    const delta = timestamp - lastTimestamp;
    this._lastTimestamp = timestamp;
    this.tick(delta);
    this._requestNextAnimationFrameID = window.requestAnimationFrame(nextTimestamp => this._tick(nextTimestamp));
  }

  /**
   * Render a single frame.
   * @param delta - The interval in milliseconds from the previous frame to this frame, needs to be manually passed in when rendering separately, default is 0.
   */
  public tick(delta: number = 0): void {
    // Update the state.
    this.update(delta);

    // Render the frame.
    const gl = this._gl;
    const canvas = this._canvas;
    this.clear(); // Clear the canvas before rendering.
    this.render(canvas, gl, delta);
  }

  /**
   * Start the animation loop.
   *
   * @public
   */
  public start(): void {
    this._requestNextAnimationFrameID = window.requestAnimationFrame(timestamp => this._tick(timestamp));
    this._playing = true;
  }

  /**
   * Pause the animation loop.
   *
   * @public
   */
  public stop(): void {
    window.cancelAnimationFrame(this._requestNextAnimationFrameID);
    this._requestNextAnimationFrameID = 0;
    this._playing = false;
  }

  private clear(): void {
    const gl = this._gl;
    gl.clearColor(...this.clearColor);
    // Clear the canvas before rendering.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Listen for the event.
   * @param event - The type of the event.
   * @param fn - The callback called when the event emitted.
   */
  public on(event: string, fn: EventCallBack<this>): void {
    const eventQueue = this._eventQueue;
    if (eventQueue[event] == null) {
      eventQueue[event] = [];
    }
    eventQueue[event].push(fn as EventCallBack<AnimateWebGlCanvas>);
  }

  /**
   * Trigger the event.
   * @param event - The type of the event.
   * @param arg - this.
   */
  public emit(event: string, arg: AnimateWebGlCanvas): void {
    const eventQueue = this._eventQueue;
    if (eventQueue[event] != null) {
      eventQueue[event].forEach(cb => cb(arg));
    }
  }

  /**
   * Remove the listener.
   * @param event - The type of the event.
   * @param fn - the handler of the listener.
   */
  public off(event: string, fn: EventCallBack<this>): void {
    const eventQueue = this._eventQueue;
    if (eventQueue[event] != null) {
      eventQueue[event].filter(cb => cb !== fn);
    }
  }

  /**
   * Get the playing status of the animation loop:
   * 'true' when it’s playing, and 'false' when it's not playing.
   */
  get playing(): boolean {
    return this._playing;
  }
}
