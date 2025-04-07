import type { FractalOptions2D } from '../src/perlin.ts';
import { Perlin } from '../src/perlin.ts';
import { AnimateWebGlCanvas } from './helper/animate_webgl_canvas.ts';
import './reset.css';
import './style.css';

class Fractal2DCanvas extends AnimateWebGlCanvas {
  private _perlin: Perlin = new Perlin();
  private _postions: number[] = [];
  private _colors: number[] = [];
  private _options: FractalOptions2D;
  constructor(
    canvas: HTMLCanvasElement,
    options: FractalOptions2D,
  ) {
    super(canvas);
    this._options = options;
    this.calcFractalNoise2D();
    this.setPointPositions(this._postions);
    this.setPointColors(this._colors);
  }

  private calcFractalNoise2D(): void {
    const perlin = this._perlin;
    const canvas = this._canvas;
    const width = canvas.width;
    const height = canvas.height;
    const options = this._options;
    const postions: number[] = [];
    const colors: number[] = [];
    for (let i: number = 0; i < width; i += 1) {
      for (let j: number = 0; j < height; j += 1) {
        const noise2 = perlin.fractalNoise2d(i * (256 / width), j * (256 / height), options);
        postions.push(i, j); // (x, y)
        const grayScale = ((noise2 + 1) / 2);
        colors.push(grayScale, grayScale, grayScale, 1); // (r, b, g, a)
      }
    }

    this._postions = postions;
    this._colors = colors;
  }

  get options(): FractalOptions2D {
    const options = this._options;
    return options;
  }

  set options(input: FractalOptions2D) {
    this._options = input;
    this.calcFractalNoise2D();
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

const options: FractalOptions2D = {
  amplitude: 1,
  frequency: { x: 0.02, y: 0.015 },
  octaves: 5,
  persistence: 0.7,
  lacunarity: { x: 2.5, y: 2.6 },
  offset: { x: 0.75, y: 0.9 },
};
const fractal2d = new Fractal2DCanvas(
  <HTMLCanvasElement>document.getElementById('fractal-noise2d')!,
  options,
);
fractal2d.tick();

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
    max: 1,
    value: options.frequency!.x,
    step: 0.01,
  },
  frequencyY: {
    min: 0.01,
    max: 1,
    value: options.frequency!.y,
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
};

function createOptionInputElms(): { [key: string]: HTMLElement } {
  const result: { [key: string]: HTMLElement } = {};
  const tempTag = <HTMLElement>document.getElementById('fractal-noise2d-option-temp')!;
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
  const valueLabel = <HTMLElement>currentElm.querySelector(`#fractal-noise2d-${element}-value`);
  currentElm.addEventListener('change', (e) => {
    const value = Number.parseFloat((e.target as HTMLInputElement).value);
    if (['amplitude', 'octaves', 'persistence'].includes(element)) {
      fractal2d.options = {
        ...fractal2d.options,
        [element]: value,
      };
    }
    if (element.startsWith('frequency')) {
      const component = element[element.length - 1].toLowerCase();
      fractal2d.options = {
        ...fractal2d.options,
        frequency: { ...fractal2d.options.frequency, [component]: value },
      };
    }
    if (element.startsWith('offset')) {
      const component = element[element.length - 1].toLowerCase();
      fractal2d.options = {
        ...fractal2d.options,
        offset: { ...fractal2d.options.offset, [component]: value },
      };
    }
    if (element.startsWith('lacunarity')) {
      const component = element[element.length - 1].toLowerCase();
      fractal2d.options = {
        ...fractal2d.options,
        lacunarity: { ...fractal2d.options.lacunarity, [component]: value },
      };
    }
    valueLabel.textContent = `${value}`;
    fractal2d.tick();
  });
});
