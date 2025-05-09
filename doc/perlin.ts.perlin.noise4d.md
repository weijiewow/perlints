<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [perlin.ts](./perlin.ts.md) &gt; [Perlin](./perlin.ts.perlin.md) &gt; [noise4d](./perlin.ts.perlin.noise4d.md)

## Perlin.noise4d() method

Generate a four-dimensional Perlin noise.

**Signature:**

```typescript
noise4d(x: number, y: number, z: number, w: number): number;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

x


</td><td>

number


</td><td>

The position on the x-axis for generating four-dimensional Perlin noise.


</td></tr>
<tr><td>

y


</td><td>

number


</td><td>

The position on the y-axis for generating four-dimensional Perlin noise.


</td></tr>
<tr><td>

z


</td><td>

number


</td><td>

The position on the z-axis for generating four-dimensional Perlin noise.


</td></tr>
<tr><td>

w


</td><td>

number


</td><td>

The position on the w-axis for generating four-dimensional Perlin noise.


</td></tr>
</tbody></table>
**Returns:**

number

The Perlin noise value between -1 and 1.

## Example


```typescript
const perlin = new Perlin();
perlin.noise4d(123.4, 432.1, 1.1, 2.2); // Return the noise value between -1 and 1.
```

