# Classical Perlin Noise

A library for 1D, 2D, 3D, and 4D classical Perlin noise in TypeScript. See the visual test cases [here](https://weijiewow.github.io/perlints/).

## Generating Noise

The library exposes a `Perlin` class. Each instance provides the following methods:

```typescript
import { Perlin } from 'perlin.ts';
const perlin = new Perlin();

// All methods following return a noise value between -1 and 1

// Generating Single Noise
// x, y, z, w: number
perlin.noise1d(x);
perlin.noise2d(x, y);
perlin.noise3d(x, y, z);
perlin.noise4d(x, y, z, w);

// Generating Fractal Noise
// x, y, z, w: number
// See the next section for fractal options details.
perlin.fractalNoise1d(x, fractalOptions1D);
perlin.fractalNoise2d(x, y, fractalOptions2D);
perlin.fractalNoise3d(x, y, z, fractalOptions3D);
perlin.fractalNoise4d(x, y, z, w, fractalOptions4D);
```

## Generating Fractal Noise

> By adding different iterations of noise (octaves), where we successively increment the frequencies in regular steps (lacunarity) and decrease the amplitude (gain) of the noise we can obtain a finer granularity in the noise and get more fine detail. This technique is called "fractal Brownian Motion" (fBM), or simply "fractal noise". -- the book of shaders

```typescript
import {
  FractalOptions1D,
  FractalOptions2D,
  FractalOptions3D,
  FractalOptions4D,
  Perlin,
} from 'perlin.ts';
const perlin: Perlin = new Perlin();

// Base 1D fractal noise (equivalent to calling perlin.noise1d(0.5))
perlin.fractalNoise1d(0.5);

// Advanced case
/*
octaves — Number of noise layers (octaves). Default: 1.0
amplitude — Initial amplitude (noise strength). Default: 1.0
persistence — Amplitude decay factor between octaves. Default: 1.0
frequency — Initial frequency per component (noise density). Default: { x: 1.0 }
lacunarity — Frequency growth factor per component between octaves. Default: { x: 1.0 }
offset — The offset of each coordinate for every layer. Default: { x: 0.0 }
*/
const options1d: FractalOptions1D = {
  octaves: 5,
  amplitude: 1.0,
  persistence: 1.5,
  frequency: { x: 0.001 },
  lacunarity: { x: 2.0 },
  offset: { x: 21.0 },
};
perlin.fractalNoise1d(10, options1d); // Return a 1d fractal noise value between -1 and 1.

// And more.
const options2d: FractalOptions2D = {
  octaves: 5,
  amplitude: 1.0,
  persistence: 1.5,
  frequency: { x: 0.001, y: 0.002 },
  lacunarity: { x: 2.0, y: 2.0 },
  offset: { x: 21.0, y: 22 },
};
perlin.fractalNoise2d(10, 11, options2d); // Return a 2d fractal noise value between -1 and 1.

const options3d: FractalOptions3D = {
  octaves: 5,
  amplitude: 1.0,
  persistence: 1.5,
  frequency: { x: 0.001, y: 0.002, z: 0.0003 },
  lacunarity: { x: 2.0, y: 2.0, z: 2.0 },
  offset: { x: 21.0, y: 22, z: 23 },
};
perlin.fractalNoise3d(10, 11, 12, options3d); // Return a 3d fractal noise value between -1 and 1.

const options4d: FractalOptions4D = {
  octaves: 5,
  amplitude: 1.0,
  persistence: 1.5,
  frequency: { x: 0.001, y: 0.002, z: 0.0003, w: 0.0004 },
  lacunarity: { x: 2.0, y: 2.0, z: 2.0, w: 2.0 },
  offset: { x: 21.0, y: 22, z: 23, w: 24 },
};
perlin.fractalNoise4d(10, 11, 12, 13, options4d); // Return a 4d fractal noise value between -1 and 1.
```

## Other methods

```typescript
import { Perlin, SmoothstepOrder } from 'perlin.ts';
const perlin = new Perlin(12345); // Create an instance using a random seed of 12345.
perlin.setSeed(54321); // Reset value of the random seed.
perlin.getSeed(); // Get value of the random seed.

perlin.shufflePerm(); // Shuffle the hash table within the instance.

const perlin2 = new Perlin(54321, SmoothstepOrder.Cubic); // Create an instance using a cubic smoothstep.
```

## Installation

```bash
npm install perlin.ts
```

Node.js, Require.js (AMD) and Common.js supported: `const Perlin = require('perlin.ts');`

Otherwise a `perlin.ts` global is created.
