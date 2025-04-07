import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Noise2DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _frequencyY: number;
  private _frequencyX: number;
  private _postions: number[] = [];
  private _colors: number[] = [];
  constructor(
    canvas: HTMLCanvasElement,
    frequencyX: number,
    frequencyY: number,
  ) {
    super(canvas);
    this._frequencyX = frequencyX;
    this._frequencyY = frequencyY;
    this.calcNoise2D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcNoise2D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const frequencyY = this._frequencyY;
    const frequencyX = this._frequencyX;
    const postions: number[] = [];
    const colors: number[] = [];
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise2 = perlin.noise2d(
          (i * (256 / width)) * frequencyX,
          (j * (256 / height)) * frequencyY,
        );
        postions.push(i, j); // (x, y)
        const grayScale = ((noise2 + 1) / 2);
        colors.push(grayScale, grayScale, grayScale, 1); // (r, b, g, a)
      }
    }
    this._postions = postions;
    this._colors = colors;
  }

  get frequencyY(): number {
    return this._frequencyY;
  }

  set frequencyY(value: number) {
    this._frequencyY = value;
    this.calcNoise2D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  get frequencyX(): number {
    return this._frequencyX;
  }

  set frequencyX(value: number) {
    this._frequencyX = value;
    this.calcNoise2D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  protected render(
    _canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
  ): void {
    gl.drawArrays(gl.POINTS, 0, this._postions.length / 2);
  }
}

const noise2 = new Noise2DCanvas(
  <HTMLCanvasElement>document.getElementById('noise2')!,
  1 / 24,
  1 / 36,
);

noise2.tick();

const noise2frequencyX = <HTMLInputElement>document.getElementById('noise2-frequencyX')!;
noise2frequencyX.value = (1 / 24).toString();
const noise2frequencyY = <HTMLInputElement>document.getElementById('noise2-frequencyY')!;
noise2frequencyY.value = (1 / 36).toString();

const noise2desc = document.getElementById('noise2-desc')!;
function setNoise2DescText(): void {
  const frequencyX = noise2.frequencyX;
  const frequencyY = noise2.frequencyY;
  const content = `perlin.noise2d : frequencyX = ${frequencyX.toFixed(2)}, frequencyY = ${frequencyY.toFixed(2)}`;
  noise2desc.textContent = content;
}
setNoise2DescText();

noise2frequencyX.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise2.frequencyX = value;
  setNoise2DescText();
  noise2.tick();
});
noise2frequencyY.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise2.frequencyY = value;
  setNoise2DescText();
  noise2.tick();
});
