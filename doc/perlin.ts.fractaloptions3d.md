<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [perlin.ts](./perlin.ts.md) &gt; [FractalOptions3D](./perlin.ts.fractaloptions3d.md)

## FractalOptions3D type

Configuration of the three-dimensional Perlin noise.

- octaves: Number of noise layers. Default: 1.0

- amplitude: Initial amplitude. Default: 1.0

- persistence: Amplitude decay coefficient. Default: 1.0

- frequency: Initial frequency of each component. Default: {<!-- -->x:1.0, y: 1.0, z: 1.0<!-- -->}

- lacunarity: Frequency growth coefficient for each component. Default: {<!-- -->x:1.0, y: 1.0, z: 1.0<!-- -->}

- offset: The amount of shift for each coordinate per layer. Default: {<!-- -->x:0.0, y: 0.0, z: 0.0<!-- -->}

**Signature:**

```typescript
export type FractalOptions3D = {
    amplitude: number;
    octaves: number;
    persistence: number;
    frequency: {
        x: number;
        y: number;
        z: number;
    };
    lacunarity: {
        x: number;
        y: number;
        z: number;
    };
    offset: {
        x: number;
        y: number;
        z: number;
    };
};
```

## Remarks

By adjusting these parameters, different natural effects can be achieved:

- Terrain generation: Use high octaves + low persistence

- Cloud layer effects: Use low octaves + high lacunarity

- Biological tissue: Use moderate persistence + offset

## Example


```ts
const perlin:Perlin = new Perlin();
const options:FractalOptions3D = {
  octaves: 5,
  amplitude: 1.0,
  persistence: 1.5,
  frequency: {x: 0.001, y: 0.001, z: 0.001},
  lacunarity: {x: 2.0, y: 2.0, z: 2.0},
  offset: {x: 21.0, y: 22.0, z: 23.0},
}
perlin.fractalNoise3d(10, 11, 12, options);
```

