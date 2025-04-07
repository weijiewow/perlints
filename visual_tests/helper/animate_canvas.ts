/**
 * Abstract class for an animation canvas based on canvas2d.
 */
export abstract class AnimateCanvas {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected requestNextAnimationFrameID: number = 0;
  private _playing: boolean = false;
  private _lastTimestamp: number = 0;
  public backgroundColor: string = '#000000';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  }

  /**
   * Update the animation loop state, this function will be called before rendering.
   * @param _delta - The interval in milliseconds from the previous frame to this frame.
   */
  protected update(_delta: number): void {};

  /**
   * Rendering
   * @param _canvas - Target canvas
   * @param _ctx - Rendering context
   * @param _delta - The interval in milliseconds from the previous frame to this frame.
   */
  protected render(_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D, _delta: number): void {};

  private _tick(timestamp: number): void {
    const lastTimestamp = this._lastTimestamp;
    const delta = timestamp - lastTimestamp;
    this._lastTimestamp = timestamp;
    this.tick(delta);
    this.requestNextAnimationFrameID = window.requestAnimationFrame(nextTimeStamp => this._tick(nextTimeStamp));
  }

  /**
   * Start the aniamtion loop.
   *
   * @public
   */
  public start(): void {
    this.requestNextAnimationFrameID = window.requestAnimationFrame(timestamp => this._tick(timestamp));
    this._playing = true;
  }

  /**
   * Pause the animation loop.
   *
   * @public
   */
  public stop(): void {
    window.cancelAnimationFrame(this.requestNextAnimationFrameID);
    this.requestNextAnimationFrameID = 0;
    this._playing = false;
  }

  /**
   * Render a single frame.
   * @param delta - The interval in milliseconds from the previous frame to this frame, needs to be manually passed in when rendering separately, default is 0.
   */
  public tick(delta: number = 0): void {
    // Update the statue of the animation.
    this.update(delta);

    const ctx = this.ctx;
    const canvas = this.canvas;

    // Clear the canvas before rendering.
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Render the next frame.
    ctx.save();
    this.render(canvas, ctx, delta);
    ctx.restore();
  }

  /**
   * Get the playing status of the animation loop:
   * 'true' when it’s playing, and 'false' when it's not playing.
   */
  get playing(): boolean {
    return this._playing;
  }
}
