import type { FractalOptions1D } from '../src/perlin.ts';
import { Perlin } from '../src/perlin.ts';
import { AnimateCanvas } from './helper/animate_canvas.ts';

import './reset.css';
import './style.css';

class Fractal1DCanvas extends AnimateCanvas {
  private _path: Path2D = new Path2D();
  private _perlin: Perlin = new Perlin();
  private _options: FractalOptions1D;

  constructor(
    canvas: HTMLCanvasElement,
    options: FractalOptions1D,
  ) {
    super(
      canvas,
    );
    this._options = options;
    this.calcPerlinPath();
  }

  private calcPerlinPath(): void {
    const canvas = this.canvas;
    const path = new Path2D();
    const options = this._options;
    const perlin = this._perlin;
    const amplitude = options.amplitude ?? 1;

    path.moveTo(0, canvas.height / 2);
    for (let i: number = 0; i < canvas.width; i += Math.random()) {
      path.lineTo(
        i,
        perlin.fractalNoise1d(i, options) * amplitude + canvas.height / 2,
      );
    }
    this._path = path;
  }

  set options(options: FractalOptions1D) {
    this._options = options;
    this.calcPerlinPath();
  }

  get options(): FractalOptions1D {
    return { ...this._options };
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

const options: FractalOptions1D = {
  amplitude: 150,
  frequency: { x: 1 / 100 },
  octaves: 3,
  persistence: 0.7,
  lacunarity: { x: 1.5 },
  offset: { x: 0.75 },
};
const fractal1d = new Fractal1DCanvas(
  <HTMLCanvasElement>document.getElementById('fractal-noise1d')!,
  options,
);
fractal1d.tick();

/**
 * mean
 *
 * \{ keyname：is number \}
 */
const optionsKeys: { [key: string]: boolean } = {
  octaves: false,
  amplitude: false,
  frequency: true,
  persistence: false,
  lacunarity: true,
  offset: true,
};

const optionProperty: { [key: string]: any } = {
  octaves: {
    min: 1,
    max: 10,
    value: options.octaves,
    step: 1,
  },
  amplitude: {
    min: 1,
    max: 225,
    value: options.amplitude,
    step: 1,
  },
  frequency: {
    min: 0,
    max: 10,
    value: options.frequency,
    step: 0.001,
  },
  persistence: {
    min: 0,
    max: 10,
    value: options.persistence,
    step: 0.1,
  },
  lacunarity: {
    min: 0,
    max: 10,
    value: options.lacunarity,
    step: 0.1,
  },
  offset: {
    min: 0,
    max: 100,
    value: options.offset,
    step: 0.1,
  },
};

function createOptionInputElms(): { [key: string]: HTMLElement } {
  const result: { [key: string]: HTMLElement } = {};
  const tempTag = <HTMLElement>document.getElementById('fractal-noise1d-option-temp')!;
  const htmlTemp: string = <string>tempTag.textContent;

  Object.keys(optionsKeys).forEach((element: string) => {
    let optionTemp = htmlTemp;
    let elmValue = optionProperty[element].value;
    if (optionsKeys[element]) {
      elmValue = optionProperty[element].value.x;
    }
    optionTemp = optionTemp.replace(/\{name\}/g, element);
    optionTemp = optionTemp.replace('{min}', optionProperty[element].min);
    optionTemp = optionTemp.replace('{max}', optionProperty[element].max);
    optionTemp = optionTemp.replace(/\{value\}/g, elmValue);
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
  const valueLabel = <HTMLElement>currentElm.querySelector(`#fractal-noise1d-${element}-value`);
  currentElm.addEventListener('change', (e) => {
    const value = Number.parseFloat((e.target as HTMLInputElement).value);
    if (optionsKeys[element]) {
      fractal1d.options = {
        ...fractal1d.options,
        [element]: { x: value },
      };
    }
    else {
      fractal1d.options = {
        ...fractal1d.options,
        [element]: value,
      };
    }
    valueLabel.textContent = `${value}`;
    fractal1d.tick();
  });
});
