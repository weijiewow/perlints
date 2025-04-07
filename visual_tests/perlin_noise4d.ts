import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Noise4DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _frequencyY: number;
  private _frequencyX: number;
  private _frequencyZ: number;
  private _frequencyW: number;
  private _z: number = 0;
  private _w: number = 0;
  private _postions: number[] = [];
  private _colors: number[] = [];
  private _playingZ: boolean = false;
  private _playingW: boolean = false;
  constructor(
    canvas: HTMLCanvasElement,
    frequencyX: number,
    frequencyY: number,
    frequencyZ: number,
    frequencyW: number,
  ) {
    super(canvas);
    this._frequencyX = frequencyX;
    this._frequencyY = frequencyY;
    this._frequencyZ = frequencyZ;
    this._frequencyW = frequencyW;
    this.calcNoise4D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcNoise4D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const frequencyY = this._frequencyY;
    const frequencyX = this._frequencyX;
    const frequencyZ = this._frequencyZ;
    const frequencyW = this._frequencyW;
    const zValue = this._z;
    const wValue = this._w;
    const postions: number[] = this._postions;
    const colors: number[] = this._colors;
    let iPosition = 0;
    let iColor = 0;
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise4 = perlin.noise4d(
          (i * (256 / width)) * frequencyX,
          (j * (256 / height)) * frequencyY,
          (zValue * (256 / height)) * frequencyZ,
          (wValue * (256 / width)) * frequencyW,
        );
        postions[iPosition++] = i;
        postions[iPosition++] = j;
        const grayScale = ((noise4 + 1) / 2);
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
    this.calcNoise4D();
    this.setPointColors(this._colors);
  }

  get frequencyX(): number {
    return this._frequencyX;
  }

  set frequencyX(value: number) {
    this._frequencyX = value;
    this.calcNoise4D();
    this.setPointColors(this._colors);
  }

  get frequencyZ(): number {
    return this._frequencyZ;
  }

  set frequencyZ(value: number) {
    this._frequencyZ = value;
    this.calcNoise4D();
    this.setPointColors(this._colors);
  }

  get frequencyW(): number {
    return this._frequencyW;
  }

  set frequencyW(value: number) {
    this._frequencyW = value;
    this.calcNoise4D();
    this.setPointColors(this._colors);
  }

  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this.calcNoise4D();
    this.setPointColors(this._colors);
  }

  get w(): number {
    return this._w;
  }

  set w(value: number) {
    this._w = value;
    this.calcNoise4D();
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
    if (this._playingZ) {
      this.z = this._z + 1.13;
      if (this.z > 600) {
        this.z = 0;
      }
    }
    if (this._playingW) {
      this.w = this._w + 1.13;
      if (this.w > 600) {
        this.w = 0;
      }
    }
  }

  public playZ(): void {
    super.stop();
    this._playingZ = true;
    this._playingW = false;
    this.start();
    this.emit('playingZ', this);
  }

  public playW(): void {
    super.stop();
    this._playingZ = false;
    this._playingW = true;
    this.start();
    this.emit('playingW', this);
  }

  public stop(): void {
    this._playingZ = false;
    this._playingW = false;
    super.stop();
    this.emit('stopped', this);
  }

  get playingZ(): boolean {
    return this._playingZ;
  }

  get playingW(): boolean {
    return this._playingW;
  }
}

const noise4 = new Noise4DCanvas(
  <HTMLCanvasElement>document.getElementById('noise4')!,
  1 / 40,
  1 / 50,
  1 / 10,
  1 / 10,
);
noise4.tick();

const noise4frequencyX = <HTMLInputElement>document.getElementById('noise4-frequencyX')!;
noise4frequencyX.value = (1 / 40).toString();
const noise4frequencyY = <HTMLInputElement>document.getElementById('noise4-frequencyY')!;
noise4frequencyY.value = (1 / 50).toString();
const noise4frequencyZ = <HTMLInputElement>document.getElementById('noise4-frequencyZ')!;
noise4frequencyZ.value = (1 / 10).toString();
const noise4frequencyW = <HTMLInputElement>document.getElementById('noise4-frequencyW')!;
noise4frequencyW.value = (1 / 10).toString();

const noise4Z = <HTMLInputElement>document.getElementById('noise4-Z')!;
noise4Z.value = (0).toString();
const noise4W = <HTMLInputElement>document.getElementById('noise4-W')!;
noise4W.value = (0).toString();

const playZ = <HTMLButtonElement>document.getElementById('noise4-playZ')!;
const playW = <HTMLButtonElement>document.getElementById('noise4-playW')!;

const noise4desc = document.getElementById('noise4-desc')!;
function setNoise4DescText(): void {
  const frequencyX = noise4.frequencyX;
  const frequencyY = noise4.frequencyY;
  const frequencyZ = noise4.frequencyZ;
  const frequencyW = noise4.frequencyW;
  const zValue = noise4.z;
  const wValue = noise4.w;
  let content = `perlin.noise4d : <br />z = ${zValue.toFixed(2)}, `;
  content += `<br />w = ${wValue.toFixed(2)}, `;
  content += `<br />frequencyX = ${frequencyX.toFixed(2)}, `;
  content += `<br />frequencyY = ${frequencyY.toFixed(2)}, `;
  content += `<br /> frequencyZ = ${frequencyZ.toFixed(2)}, `;
  content += `<br /> frequencyW = ${frequencyW.toFixed(2)}`;
  noise4desc.innerHTML = content;
}
setNoise4DescText();

noise4.on('rendered', (next: Noise4DCanvas) => {
  noise4Z.value = next.z.toFixed(2);
  noise4W.value = next.w.toFixed(2);
  setNoise4DescText();
});

noise4frequencyX.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.frequencyX = value;
  setNoise4DescText();
  noise4.tick();
});
noise4frequencyY.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.frequencyY = value;
  setNoise4DescText();
  noise4.tick();
});
noise4frequencyZ.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.frequencyZ = value;
  setNoise4DescText();
  noise4.tick();
});
noise4frequencyW.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.frequencyW = value;
  setNoise4DescText();
  noise4.tick();
});

noise4Z.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.z = value;
  setNoise4DescText();
  noise4.tick();
});

noise4W.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  noise4.w = value;
  setNoise4DescText();
  noise4.tick();
});

playZ.addEventListener('click', (e) => {
  e.preventDefault();
  if (noise4.playingZ) {
    noise4.stop();
    noise4.tick();
  }
  else {
    noise4.playZ();
  }
});

playW.addEventListener('click', (e) => {
  e.preventDefault();
  if (noise4.playingW) {
    noise4.stop();
    noise4.tick();
  }
  else {
    noise4.playW();
  }
});

noise4.on('playingZ', () => {
  playZ.textContent = 'Stop';
  playW.textContent = 'Play-W';
});

noise4.on('playingW', () => {
  playW.textContent = 'Stop';
  playZ.textContent = 'Play-Z';
});

noise4.on('stopped', () => {
  playW.textContent = 'Play-W';
  playZ.textContent = 'Play-Z';
});
