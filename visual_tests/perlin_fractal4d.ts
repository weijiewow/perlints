import type { FractalOptions4D } from '../src/perlin.ts';
import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Fractal4DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _postions: number[] = [];
  private _colors: number[] = [];
  private _options: FractalOptions4D;
  private _z: number = 0;
  private _w: number = 0;
  private _playingZ: boolean = false;
  private _playingW: boolean = false;
  constructor(
    canvas: HTMLCanvasElement,
    options: FractalOptions4D,
  ) {
    super(canvas);
    this._options = options;
    this.calcFractalNoise4D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcFractalNoise4D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const options = this._options;
    const postions: number[] = this._postions;
    const colors: number[] = this._colors;
    const z = this._z;
    const w = this._w;
    let iPosition = 0;
    let iColor = 0;
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise4 = perlin.fractalNoise4d(i * (256 / width), j * (256 / height), z * (256 / 600), w * (256 / 600), options);
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

  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this.calcFractalNoise4D();
    this.setPointColors(this._colors);
  }

  get w(): number {
    return this._w;
  }

  set w(value: number) {
    this._w = value;
    this.calcFractalNoise4D();
    this.setPointColors(this._colors);
  }

  get options(): FractalOptions4D {
    const options = this._options;
    return options;
  }

  set options(input: FractalOptions4D) {
    this._options = input;
    this.calcFractalNoise4D();
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

const options: FractalOptions4D = {
  amplitude: 1,
  frequency: { x: 0.02, y: 0.015, z: 0.025, w: 0.03 },
  octaves: 5,
  persistence: 0.7,
  lacunarity: { x: 2.5, y: 2.6, z: 3, w: 3 },
  offset: { x: 0.75, y: 0.9, z: 12.3, w: 8.9 },
};
const fractal4d = new Fractal4DCanvas(
  <HTMLCanvasElement>document.getElementById('fractal-noise4d')!,
  options,
);
fractal4d.tick();

const optionProperty: { [key: string]: any } = {
  amplitude: {
    min: 1,
    max: 10,
    value: options.amplitude,
    step: 1,
  },
  octaves: {
    min: 1,
    max: 10,
    value: options.octaves,
    step: 1,
  },
  frequencyX: {
    min: 0.01,
    max: 3,
    value: options.frequency!.x,
    step: 0.01,
  },
  frequencyY: {
    min: 0.01,
    max: 3,
    value: options.frequency!.y,
    step: 0.01,
  },
  frequencyZ: {
    min: 0.01,
    max: 3,
    value: options.frequency!.z,
    step: 0.01,
  },
  frequencyW: {
    min: 0.01,
    max: 3,
    value: options.frequency!.w,
    step: 0.01,
  },
  persistence: {
    min: 0,
    max: 10,
    value: options.persistence,
    step: 0.01,
  },
  lacunarityX: {
    min: 0,
    max: 10,
    value: options.lacunarity!.x,
    step: 0.01,
  },
  lacunarityY: {
    min: 0,
    max: 10,
    value: options.lacunarity!.y,
    step: 0.01,
  },
  lacunarityZ: {
    min: 0,
    max: 10,
    value: options.lacunarity!.z,
    step: 0.01,
  },
  lacunarityW: {
    min: 0,
    max: 10,
    value: options.lacunarity!.w,
    step: 0.01,
  },

  offsetX: {
    min: 0,
    max: 100,
    value: options.offset!.x,
    step: 0.1,
  },
  offsetY: {
    min: 0,
    max: 100,
    value: options.offset!.y,
    step: 0.1,
  },
  offsetZ: {
    min: 0,
    max: 100,
    value: options.offset!.z,
    step: 0.1,
  },
  offsetW: {
    min: 0,
    max: 100,
    value: options.offset!.w,
    step: 0.1,
  },
};

function createOptionInputElms(): { [key: string]: HTMLElement } {
  const result: { [key: string]: HTMLElement } = {};
  const tempTag = <HTMLElement>document.getElementById('fractal-noise4d-option-temp')!;
  const htmlTemp: string = <string>tempTag.textContent;

  Object.keys(optionProperty).forEach((element) => {
    let optionTemp = htmlTemp;
    const elmValue = optionProperty[element].value;
    optionTemp = optionTemp.replace(/\{name\}/g, element);
    optionTemp = optionTemp.replace('{min}', optionProperty[element].min);
    optionTemp = optionTemp.replace('{max}', optionProperty[element].max);
    optionTemp = optionTemp.replace(/\{value\}/g, elmValue.toFixed(2));
    optionTemp = optionTemp.replace('{step}', optionProperty[element].step);

    const elm = document.createElement('div');
    elm.innerHTML = optionTemp;
    tempTag.parentNode!.appendChild(elm);
    result[element] = elm;
  });
  return result;
}

const inputElms = createOptionInputElms();
Object.keys(inputElms).forEach((element) => {
  const currentElm = inputElms[element];
  const valueLabel = <HTMLElement>currentElm.querySelector(`#fractal-noise4d-${element}-value`);
  currentElm.addEventListener('change', (e) => {
    const value = Number.parseFloat((e.target as HTMLInputElement).value);
    if (['amplitude', 'octaves', 'persistence'].includes(element)) {
      fractal4d.options = {
        ...fractal4d.options,
        [element]: value,
      };
    }
    if (element.startsWith('frequency')) {
      const component = element[element.length - 1].toLowerCase();
      fractal4d.options = {
        ...fractal4d.options,
        frequency: { ...fractal4d.options.frequency, [component]: value },
      };
    }
    if (element.startsWith('offset')) {
      const component = element[element.length - 1].toLowerCase();
      fractal4d.options = {
        ...fractal4d.options,
        offset: { ...fractal4d.options.offset, [component]: value },
      };
    }
    if (element.startsWith('lacunarity')) {
      const component = element[element.length - 1].toLowerCase();
      fractal4d.options = {
        ...fractal4d.options,
        lacunarity: { ...fractal4d.options.lacunarity, [component]: value },
      };
    }
    fractal4d.tick();
    valueLabel.textContent = `${value}`;
  });
});

const fractalNoise4Z = <HTMLInputElement>document.getElementById('fractal-noise4-Z')!;
const fractalNoise4ZValueText = <HTMLLabelElement>document.getElementById('fractal-noise4d-Z-value')!;
fractalNoise4Z.value = (0).toString();
fractalNoise4ZValueText.textContent = '0';

fractalNoise4Z.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  fractal4d.z = value;
  fractalNoise4Z.value = (value).toString();
  fractalNoise4ZValueText.textContent = value.toFixed(2);
  fractal4d.tick();
});

const fractalNoise4W = <HTMLInputElement>document.getElementById('fractal-noise4-W')!;
const fractalNoise4WValueText = <HTMLLabelElement>document.getElementById('fractal-noise4d-W-value')!;
fractalNoise4W.value = (0).toString();
fractalNoise4WValueText.textContent = '0';

fractalNoise4W.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  fractal4d.w = value;
  fractalNoise4W.value = (value).toString();
  fractalNoise4WValueText.textContent = value.toFixed(2);
  fractal4d.tick();
});

const playZ = <HTMLButtonElement>document.getElementById('fractal-noise4-playZ')!;
const playW = <HTMLButtonElement>document.getElementById('fractal-noise4-playW')!;

playZ.addEventListener('click', (e) => {
  e.preventDefault();
  if (fractal4d.playingZ) {
    fractal4d.stop();
    fractal4d.tick();
  }
  else {
    fractal4d.playZ();
  }
});

playW.addEventListener('click', (e) => {
  e.preventDefault();
  if (fractal4d.playingW) {
    fractal4d.stop();
    fractal4d.tick();
  }
  else {
    fractal4d.playW();
  }
});

fractal4d.on('playingZ', () => {
  playZ.textContent = 'Stop';
  playW.textContent = 'Play-W';
});

fractal4d.on('playingW', () => {
  playW.textContent = 'Stop';
  playZ.textContent = 'Play-Z';
});

fractal4d.on('stopped', () => {
  playW.textContent = 'Play-W';
  playZ.textContent = 'Play-Z';
});

fractal4d.on('rendered', (next: Fractal4DCanvas) => {
  fractalNoise4Z.value = next.z.toFixed(2);
  fractalNoise4ZValueText.textContent = next.z.toFixed(2);
  fractalNoise4W.value = next.w.toFixed(2);
  fractalNoise4WValueText.textContent = next.w.toFixed(2);
});
