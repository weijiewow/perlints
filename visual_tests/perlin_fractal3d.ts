import type { FractalOptions3D } from '../src/perlin.ts';
import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Fractal3DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _postions: number[] = [];
  private _colors: number[] = [];
  private _options: FractalOptions3D;
  private _z: number = 0;
  constructor(
    canvas: HTMLCanvasElement,
    options: FractalOptions3D,
  ) {
    super(canvas);
    this._options = options;
    this.calcFractalNoise3D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcFractalNoise3D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const options = this._options;
    const postions: number[] = this._postions;
    const colors: number[] = this._colors;
    const z = this._z;
    let iPosition = 0;
    let iColor = 0;
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise3 = perlin.fractalNoise3d(i * (256 / width), j * (256 / height), z * (256 / 600), options);
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

  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this.calcFractalNoise3D();
    this.setPointColors(this._colors);
  }

  get options(): FractalOptions3D {
    const options = this._options;
    return options;
  }

  set options(input: FractalOptions3D) {
    this._options = input;
    this.calcFractalNoise3D();
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
    if (this.playing) {
      this.z = this._z + 1.13;
      if (this.z > 600) {
        this.z = 0;
      }
    }
  }
}

const options: FractalOptions3D = {
  amplitude: 1,
  frequency: { x: 0.02, y: 0.015, z: 0.025 },
  octaves: 5,
  persistence: 0.7,
  lacunarity: { x: 2.5, y: 2.6, z: 3 },
  offset: { x: 0.75, y: 0.9, z: 12.3 },
};
const fractal3d = new Fractal3DCanvas(
  <HTMLCanvasElement>document.getElementById('fractal-noise3d')!,
  options,
);
fractal3d.tick();

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
};

function createOptionInputElms(): { [key: string]: HTMLElement } {
  const result: { [key: string]: HTMLElement } = {};
  const tempTag = <HTMLElement>document.getElementById('fractal-noise3d-option-temp')!;
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
  const valueLabel = <HTMLElement>currentElm.querySelector(`#fractal-noise3d-${element}-value`);
  currentElm.addEventListener('change', (e) => {
    const value = Number.parseFloat((e.target as HTMLInputElement).value);
    if (['amplitude', 'octaves', 'persistence'].includes(element)) {
      fractal3d.options = {
        ...fractal3d.options,
        [element]: value,
      };
    }
    if (element.startsWith('frequency')) {
      const component = element[element.length - 1].toLowerCase();
      fractal3d.options = {
        ...fractal3d.options,
        frequency: { ...fractal3d.options.frequency, [component]: value },
      };
    }
    if (element.startsWith('offset')) {
      const component = element[element.length - 1].toLowerCase();
      fractal3d.options = {
        ...fractal3d.options,
        offset: { ...fractal3d.options.offset, [component]: value },
      };
    }
    if (element.startsWith('lacunarity')) {
      const component = element[element.length - 1].toLowerCase();
      fractal3d.options = {
        ...fractal3d.options,
        lacunarity: { ...fractal3d.options.lacunarity, [component]: value },
      };
    }
    fractal3d.tick();
    valueLabel.textContent = `${value}`;
  });
});

const fractalNoise3Z = <HTMLInputElement>document.getElementById('fractal-noise3-Z')!;
const fractalNoise3ZValueText = <HTMLLabelElement>document.getElementById('fractal-noise3d-Z-value')!;
fractalNoise3Z.value = (0).toString();
fractalNoise3ZValueText.textContent = '0';

fractalNoise3Z.addEventListener('change', (e) => {
  const value = Number.parseFloat((e.target as HTMLInputElement).value);
  fractal3d.z = value;
  fractalNoise3Z.value = (value).toString();
  fractalNoise3ZValueText.textContent = value.toFixed(2);
  fractal3d.tick();
});

const play = <HTMLButtonElement>document.getElementById('fractal-noise3-play')!;
play.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target as HTMLButtonElement;
  if (fractal3d.playing) {
    target.textContent = 'Play-Z';
    fractal3d.stop();
    fractal3d.tick();
  }
  else {
    target.textContent = 'Stop';
    fractal3d.start();
  }
});

fractal3d.on('rendered', (next: Fractal3DCanvas) => {
  fractalNoise3Z.value = next.z.toFixed(2);
  fractalNoise3ZValueText.textContent = next.z.toFixed(2);
});
