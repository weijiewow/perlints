import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Noise3DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _frequencyY: number;
  private _frequencyX: number;
  private _frequencyZ: number;
  private _z: number = 0;
  private _postions: number[] = [];
  private _colors: number[] = [];
  constructor(
    canvas: HTMLCanvasElement,
    frequencyX: number,
    frequencyY: number,
    frequencyZ: number,
  ) {
    super(canvas);
    this._frequencyX = frequencyX;
    this._frequencyY = frequencyY;
    this._frequencyZ = frequencyZ;
    this.calcNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcNoise3D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const frequencyY = this._frequencyY;
    const frequencyX = this._frequencyX;
    const frequencyZ = this._frequencyZ;
    const zValue = this._z;
    const postions: number[] = this._postions;
    const colors: number[] = this._colors;
    let iPosition = 0;
    let iColor = 0;
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise3 = perlin.noise3d(
          (i * (256 / width)) * frequencyX,
          (j * (256 / height)) * frequencyY,
          (zValue * (256 / height)) * frequencyZ,
        );
        postions[iPosition++] = i;
        postions[iPosition++] = j;
        const grayScale = ((noise3 + 1) / 2);
        colors[iColor++] = grayScale;
        colors[iColor++] = grayScale;
        colors[iColor++] = grayScale;
        colors[iColor++] = 1.0;
      }
    }
  }

  get frequencyY(): number {
    return this._frequencyY;
  }

  set frequencyY(value: number) {
    this._frequencyY = value;
    this.calcNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  get frequencyX(): number {
    return this._frequencyX;
  }

  set frequencyX(value: number) {
    this._frequencyX = value;
    this.calcNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  get frequencyZ(): number {
    return this._frequencyZ;
  }

  set frequencyZ(value: number) {
    this._frequencyZ = value;
    this.calcNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this.calcNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  protected render(
    _canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
  ): void {
    gl.drawArrays(gl.POINTS, 0, this._postions.length / 2);
    this.emit('rendered', this);
  }

  protected update(): void {
    this.z = this._z + 1.13;
    if (this.z > 600) {
      this.z = 0;
    }
  }
}

const noise3 = new Noise3DCanvas(
  <HTMLCanvasElement>document.getElementById('noise3')!,
  1 / 40,
  1 / 50,
  1 / 10,
);
noise3.tick();

const noise3frequencyX = <HTMLInputElement>document.getElementById('noise3-frequencyX')!;
noise3frequencyX.value = (1 / 24).toString();
const noise3frequencyY = <HTMLInputElement>document.getElementById('noise3-frequencyY')!;
noise3frequencyY.value = (1 / 36).toString();
const noise3frequencyZ = <HTMLInputElement>document.getElementById('noise3-frequencyZ')!;
noise3frequencyZ.value = (1 / 36).toString();
const noise3Z = <HTMLInputElement>document.getElementById('noise3-Z')!;
noise3Z.value = (0).toString();
const play = <HTMLButtonElement>document.getElementById('noise3-play')!;

const noise3desc = document.getElementById('noise3-desc')!;
function setNoise3DescText(): void {
  const frequencyX = noise3.frequencyX;
  const frequencyY = noise3.frequencyY;
  const frequencyZ = noise3.frequencyZ;
  const zValue = noise3.z;
  const content = `perlin.noise3d : <br />z = ${zValue.toFixed(2)}, <br />frequencyX = ${frequencyX.toFixed(2)}, <br />frequencyY = ${frequencyY.toFixed(2)}<br /> frequencyZ = ${frequencyZ.toFixed(2)}`;
  noise3desc.innerHTML = content;
}
setNoise3DescText();

noise3.on('rendered', (next: Noise3DCanvas) => {
  noise3Z.value = next.z.toFixed(2);
  setNoise3DescText();
});

noise3frequencyX.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise3.frequencyX = value;
  setNoise3DescText();
  noise3.tick();
});
noise3frequencyY.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise3.frequencyY = value;
  setNoise3DescText();
  noise3.tick();
});
noise3frequencyZ.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise3.frequencyZ = value;
  setNoise3DescText();
  noise3.tick();
});

noise3Z.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise3.z = value;
  setNoise3DescText();
  noise3.tick();
});

play.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target as HTMLButtonElement;
  if (noise3.playing) {
    target.textContent = 'Play-Z';
    noise3.stop();
    noise3.tick();
  }
  else {
    target.textContent = 'Stop';
    noise3.start();
  }
});
