import { Perlin } from '../src/perlin.ts';
import { AnimateCanvas } from './helper/animate_canvas.ts';
import './reset.css';
import './style.css';

class Noise1DCanvas extends AnimateCanvas {
  private _path: Path2D = new Path2D();
  private _perlin: Perlin = new Perlin();
  private _amplitude: number;
  private _frequency: number;
  constructor(canvas: HTMLCanvasElement, amplitude: number, frequency: number) {
    super(
      canvas,
    );
    this._amplitude = amplitude;
    this._frequency = frequency;
    this.calcPerlinPath();
  }

  private calcPerlinPath(): void {
    const canvas = this.canvas;
    const perlin = this._perlin;
    const amplitude = this._amplitude;
    const frequency = this._frequency;
    const path = new Path2D();

    path.moveTo(0, canvas.height / 2);
    for (let i: number = 0; i < canvas.width; i += Math.random()) {
      path.lineTo(
        i,
        perlin.noise1d(i * frequency) * amplitude + canvas.height / 2,
      );
    }
    this._path = path;
  }

  set amplitude(value: number) {
    this._amplitude = value;
    this.calcPerlinPath();
  }

  set frequency(value: number) {
    this._frequency = value;
    this.calcPerlinPath();
  }

  get amplitude(): number {
    return this._amplitude;
  }

  get frequency(): number {
    return this._frequency;
  }

  private renderCrossLine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'rgba(78, 78, 78, 0.74)';
    ctx.lineWidth = 1;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  protected render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.87)';
    ctx.lineWidth = 2;
    ctx.stroke(this._path);
    this.renderCrossLine(canvas, ctx);
  }
}

const noise1 = new Noise1DCanvas(
  <HTMLCanvasElement>document.getElementById('noise1')!,
  100,
  0.02,
);
noise1.tick();

const noise1amplitude = <HTMLInputElement>document.getElementById('noise1-amplitude')!;
noise1amplitude.value = '100';
const noise1frequency = <HTMLInputElement>document.getElementById('noise1-frequency')!;
noise1frequency.value = '0.02';

const noise1desc = document.getElementById('noise1-desc')!;
function setNoise1DescText(): void {
  const amplitude = noise1.amplitude;
  const frequency = noise1.frequency;
  const content = `perlin.noise1d : amplitude = ${amplitude}, frequency = ${frequency}`;
  noise1desc.textContent = content;
}
setNoise1DescText();

noise1amplitude.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise1.amplitude = (value ?? 100);
  setNoise1DescText();
  noise1.tick();
});
noise1frequency.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise1.frequency = value;
  setNoise1DescText();
  noise1.tick();
});
