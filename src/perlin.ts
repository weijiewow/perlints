/**
 * The order of the smoothstep，see：
 *
 * https://en.wikipedia.org/wiki/Smoothstep
 * @public
 */
export enum SmoothstepOrder { Linear, Cubic, Quintic }

/**
 * Class for a linear congruential generator，see：
 *
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 *
 * @internal
 */
class LCGRandom {
  private a: number = 1664525;
  private c: number = 1013904223;
  private m: number = 2 ** 32;
  constructor(
    private seed: number = 1335,
  ) {
  }

  public next(): number {
    this.seed = (this.a * this.seed + this.c) % this.m;
    return this.seed / this.m;
  }
}

/**
 * Configuration of the one-dimensional Perlin noise.
 *
 * - octaves: Number of noise layers. Default: 1.0
 *
 * - amplitude: Initial amplitude. Default: 1.0
 *
 * - persistence: Amplitude decay coefficient. Default: 1.0
 *
 * - frequency: Initial frequency of each component. Default: \{x:1.0\}
 *
 * - lacunarity: Frequency growth coefficient for each component. Default: \{x:1.0\}
 *
 * - offset: The amount of shift for each coordinate per layer. Default: \{x:0.0\}
 *
 * @remarks
 * By adjusting these parameters, different natural effects can be achieved:
 *
 * - Terrain generation: Use high octaves + low persistence
 *
 * - Cloud layer effects: Use low octaves + high lacunarity
 *
 * - Biological tissue: Use moderate persistence + offset
 *
 * @example
 * ```ts
 * const perlin:Perlin = new Perlin();
 * const options:FractalOptions1D = {
 *   octaves: 3,
 *   amplitude: 1.0,
 *   persistence: 1.5,
 *   frequency: {x: 0.001},
 *   lacunarity: {x: 2.0},
 *   offset: {x: 24.0},
 * }
 * perlin.fractalNoise1d(10, options);
 * ```
 * @public
 */
export type FractalOptions1D = {
  amplitude: number
  octaves: number
  persistence: number
  frequency: { x: number }
  lacunarity: { x: number }
  offset: { x: number }
};

/**
 * Configuration of the two-dimensional Perlin noise.
 *
 * - octaves: Number of noise layers. Default: 1.0
 *
 * - amplitude: Initial amplitude. Default: 1.0
 *
 * - persistence: Amplitude decay coefficient. Default: 1.0
 *
 * - frequency: Initial frequency of each component. Default: \{x:1.0, y: 1.0\}
 *
 * - lacunarity: Frequency growth coefficient for each component. Default: \{x:1.0, y: 1.0\}
 *
 * - offset: The amount of shift for each coordinate per layer. Default: \{x:0.0, y: 0.0\}
 *
 * @remarks
 * By adjusting these parameters, different natural effects can be achieved:
 *
 * - Terrain generation: Use high octaves + low persistence
 *
 * - Cloud layer effects: Use low octaves + high lacunarity
 *
 * - Biological tissue: Use moderate persistence + offset
 *
 * @example
 * ```ts
 * const perlin:Perlin = new Perlin();
 * const options:FractalOptions2D = {
 *   octaves: 5,
 *   amplitude: 1.0,
 *   persistence: 1.5,
 *   frequency: {x: 0.001, y: 0.001},
 *   lacunarity: {x: 2.0, y: 2.0},
 *   offset: {x: 2.0, y: 2.0},
 * }
 * perlin.fractalNoise2d(10, 20, options);
 * ```
 * @public
 */
export type FractalOptions2D = {
  amplitude: number
  octaves: number
  persistence: number
  frequency: { x: number, y: number }
  lacunarity: { x: number, y: number }
  offset: { x: number, y: number }
};

/**
 * Configuration of the three-dimensional Perlin noise.
 *
 * - octaves: Number of noise layers. Default: 1.0
 *
 * - amplitude: Initial amplitude. Default: 1.0
 *
 * - persistence: Amplitude decay coefficient. Default: 1.0
 *
 * - frequency: Initial frequency of each component. Default: \{x:1.0, y: 1.0, z: 1.0\}
 *
 * - lacunarity: Frequency growth coefficient for each component. Default: \{x:1.0, y: 1.0, z: 1.0\}
 *
 * - offset: The amount of shift for each coordinate per layer. Default: \{x:0.0, y: 0.0, z: 0.0\}
 *
 * @remarks
 * By adjusting these parameters, different natural effects can be achieved:
 *
 * - Terrain generation: Use high octaves + low persistence
 *
 * - Cloud layer effects: Use low octaves + high lacunarity
 *
 * - Biological tissue: Use moderate persistence + offset
 *
 * @example
 * ```ts
 * const perlin:Perlin = new Perlin();
 * const options:FractalOptions3D = {
 *   octaves: 5,
 *   amplitude: 1.0,
 *   persistence: 1.5,
 *   frequency: {x: 0.001, y: 0.001, z: 0.001},
 *   lacunarity: {x: 2.0, y: 2.0, z: 2.0},
 *   offset: {x: 21.0, y: 22.0, z: 23.0},
 * }
 * perlin.fractalNoise3d(10, 11, 12, options);
 * ```
 * @public
 */
export type FractalOptions3D = {
  amplitude: number
  octaves: number
  persistence: number
  frequency: { x: number, y: number, z: number }
  lacunarity: { x: number, y: number, z: number }
  offset: { x: number, y: number, z: number }
};

/**
 * Configuration of the four-dimensional Perlin noise.
 *
 * - octaves: Number of noise layers. Default: 1.0
 *
 * - amplitude: Initial amplitude. Default: 1.0
 *
 * - persistence: Amplitude decay coefficient. Default: 1.0
 *
 * - frequency: Initial frequency of each component. Default: \{x:1.0, y: 1.0, z: 1.0, w: 1.0\}
 *
 * - lacunarity: Frequency growth coefficient for each component. Default: \{x:1.0, y: 1.0, z: 1.0, w: 1.0\}
 *
 * - offset: The amount of shift for each coordinate per layer. Default: \{x:0.0, y: 0.0, z: 0.0, w: 0.0\}
 *
 * @remarks
 * By adjusting these parameters, different natural effects can be achieved:
 *
 * - Terrain generation: Use high octaves + low persistence
 *
 * - Cloud layer effects: Use low octaves + high lacunarity
 *
 * - Biological tissue: Use moderate persistence + offset
 *
 * @example
 * ```ts
 * const perlin:Perlin = new Perlin();
 * const options:FractalOptions4D = {
 *   octaves: 5,
 *   amplitude: 1.0,
 *   persistence: 1.5,
 *   frequency: {x: 0.001, y: 0.001, z: 0.001, w: 0.001},
 *   lacunarity: {x: 2.0, y: 2.0, z: 2.0, w: 2.0},
 *   offset: {x: 21.0, y: 22.0, z: 23.0, w: 24.0},
 * }
 * perlin.fractalNoise4d(10, 11, 12, 13, options);
 * ```
 * @public
 */
export type FractalOptions4D = {
  amplitude: number
  octaves: number
  persistence: number
  frequency: { x: number, y: number, z: number, w: number }
  lacunarity: { x: number, y: number, z: number, w: number }
  offset: { x: number, y: number, z: number, w: number }
};

/**
 * The Perlin noise generator is capable of producing smooth random numbers that adhere to natural laws and are within the range of [-1, 1].
 *
 * @remarks
 * See {@link https://en.wikipedia.org/wiki/Perlin_noise | Perlin noise wikipedia} for more.
 *
 * @example
 * Get single noise：
 * ```typescript
 * const perlin = new Perlin();
 * perlin.noise1d(x);          // Generate one-dimensional Perlin noise.
 * perlin.noise2d(x, y);       // Generate two-dimensional Perlin noise.
 * perlin.noise3d(x, y, z);    // Generate three-dimensional Perlin noise.
 * perlin.noise4d(x, y, z, w); // Generate four-dimensional Perlin noise.
 * ```
 *
 * @example
 * FBM：
 * ```typescript
 * const perlin = new Perlin();
 * perlin.fractalNoise1d(x, fractalOptions1d);
 * perlin.fractalNoise2d(x, y, fractalOptions2d);
 * perlin.fractalNoise3d(x, y, z, fractalOptions3d);
 * perlin.fractalNoise4d(x, y, z, w, fractalOptions4d);
 * ```
 *
 * @example
 * Other methods：
 * ```typescript
 * const perlin = new Perlin(12345);               // Instantiate a Perlin noise generator using 12345 as the random seed.
 * perlin.smoothstepOrder = SmoothstepOrder.Cubic; // Set the order of the smoothstep function.
 * perlin.shufflePerm();                           // Randomize the internal hash table.
 * perlin.getSeed();                               // Get the random seed value.
 * perlin.setSeed(54321);                          // Set the random seed value. After set, the this.shufflePerm method will be automatically called once.
 * ```
 *
 * @public
 */
export class Perlin {
  /**
   * The random array initially proposed by Ken Perlin, the inventor of the Perlin noise algorithm.
   *
   * @remarks
   * It is an array composed of numbers [0, 1, 2, 3, …, 255], but the order is shuffled.
   *
   * @internal
   */
  private static readonly _permutation: number[] = <number[]>[
    151,
    160,
    137,
    91,
    90,
    15,
    131,
    13,
    201,
    95,
    96,
    53,
    194,
    233,
    7,
    225,
    140,
    36,
    103,
    30,
    69,
    142,
    8,
    99,
    37,
    240,
    21,
    10,
    23,
    190,
    6,
    148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,
    169,
    200,
    196,
    135,
    130,
    116,
    188,
    159,
    86,
    164,
    100,
    109,
    198,
    173,
    186,
    3,
    64,
    52,
    217,
    226,
    250,
    124,
    123,
    5,
    202,
    38,
    147,
    118,
    126,
    255,
    82,
    85,
    212,
    207,
    206,
    59,
    227,
    47,
    16,
    58,
    17,
    182,
    189,
    28,
    42,
    223,
    183,
    170,
    213,
    119,
    248,
    152,
    2,
    44,
    154,
    163,
    70,
    221,
    153,
    101,
    155,
    167,
    43,
    172,
    9,
    129,
    22,
    39,
    253,
    19,
    98,
    108,
    110,
    79,
    113,
    224,
    232,
    178,
    185,
    112,
    104,
    218,
    246,
    97,
    228,
    251,
    34,
    242,
    193,
    238,
    210,
    144,
    12,
    191,
    179,
    162,
    241,
    81,
    51,
    145,
    235,
    249,
    14,
    239,
    107,
    49,
    192,
    214,
    31,
    181,
    199,
    106,
    157,
    184,
    84,
    204,
    176,
    115,
    121,
    50,
    45,
    127,
    4,
    150,
    254,
    138,
    236,
    205,
    93,
    222,
    114,
    67,
    29,
    24,
    72,
    243,
    141,
    128,
    195,
    78,
    66,
    215,
    61,
    156,
    180,
  ];

  /**
   * HASH table
   *
   * @remarks
   * When generating noise, the gradient vector is selected based on the values of the members within.
   *
   * @privateRemarks
   * It is obtained by repeating _permutation twice.
   * _perm = [...Perlin._permutation, ...Perlin._permutation]
   *
   * @internal
   */
  private _perm: number[] = <number[]> [...Perlin._permutation, ...Perlin._permutation];

  /**
   * The order of the smoothstep function of the Berlin noise generator.
   * @defaultValue SmoothstepOrder.Quintic
   *
   * @public
   */
  public smoothstepOrder: SmoothstepOrder;

  /**
   * The seed of the linear congruential generator.
   * @defaultValue -1
   *
   * @public
   */
  private _seed: number;

  /**
   * The linear congruential generator.
   *
   * @public
   */
  private _random: LCGRandom;

  /**
   * Create an instance of the Perlin noise generator
   * @param seed - The random seed value default to 1335.
   * @param smoothstepOrder - The order of the smoothstep function in the Perlin noise generator default to SmoothstepOrder.Quintic.
   *
   * @public
   */
  constructor(seed: number = 1335, smoothstepOrder: SmoothstepOrder = SmoothstepOrder.Quintic) {
    this.smoothstepOrder = smoothstepOrder;
    this._seed = seed;
    this._random = new LCGRandom(this._seed);
    this.shufflePerm();
  }

  /**
   * Set the random seed
   *
   * @param value - The value of the random seed
   *
   * @remarks
   * Once the seed changes, the internal random number hash table will be shuffled immediately.
   *
   * @public
   */
  public setSeed(value: number): void {
    if (value !== this._seed) {
      this._seed = value;
      this._random = new LCGRandom(this._seed);
      this.shufflePerm();
    }
  }

  /**
   * Get the value of the random seed
   *
   * @public
   */
  public getSeed(): number {
    return this._seed;
  }

  /**
   * Shuffle the internal hash table.
   *
   * @remarks
   * Implement the Fisher-Yates shuffle algorithm for double arrangement of the hash table:
   * - Create a copy of the original permutation list to operate on, to avoid modifying the original data
   * - Use a random number generator to swap element positions
   * - Copy the shuffled permutation list twice and concatenate them to ensure the cyclic nature of the hash table
   *
   * @example
   * ```typescript
   * const perlin = new Perlin();
   * perlin.shufflePerm(); // Shuffle the internal hash table to ensure randomness
   * ```
   *
   * @public
   */
  public shufflePerm(): void {
    const rng = this._random;
    // Create a copy of the original permutation list to operate on, to avoid modifying the original data
    const permutation = [...Perlin._permutation];

    // The Fisher-Yates algorithm
    for (let i = permutation.length - 1; i > 0; i--) {
      // Generating the random index between 0 and i.
      const n = Math.floor(rng.next() * (i + 1));

      // Swap the location of the two members.
      [permutation[i], permutation[n]] = [permutation[n], permutation[i]];
    }

    this._perm = [...permutation, ...permutation];
  }

  /**
   * The list of the one-dimensional gradient.
   *
   * @remarks
   * For the calculation of gradient contributions used in one-dimensional Perlin noise,
   * randomly select numbers from it and multiply them when calculating the gradient contributions.
   *
   * @privateRemarks
   * These numbers are just made up by me, and they work quite well.
   *
   * @internal
   */
  private static readonly _gradient1d: number[] = [
    1.0 / 4.0,
    2.0 / 4.0,
    3.0 / 4.0,
    4.0 / 4.0,
    5.0 / 4.0,
    6.0 / 4.0,
    7.0 / 4.0,
    8.0 / 4.0,
    0,
    -1.0 / 4.0,
    -2.0 / 4.0,
    -3.0 / 4.0,
    -4.0 / 4.0,
    -5.0 / 4.0,
    -6.0 / 4.0,
    -7.0 / 4.0,
    -8.0 / 4.0,
  ];

  /**
   * The list of the two-dimensional gradient.
   *
   * @remarks
   * For the calculation of gradient contributions for two-dimensional Perlin noise,
   *  each vector contains two non-zero components,
   *  and a random vector is selected from them for dot product calculation when computing the gradient contributions.
   *
   * @privateRemarks
   * Hardcoded 8 two-dimensional gradient vectors, grouped by axis combination:
   * - Each vector has exactly two non-zero components
   * - The values of the non-zero components are ±1
   * - Cover all possible two-dimensional axis combinations
   *
   * @internal
   */
  private static readonly _gradient2d: number[][] = [
    <number[]>[-1.0, -1.0],
    <number[]>[1.0, -1.0],
    <number[]>[-1.0, 1.0],
    <number[]>[1.0, 1.0],
    <number[]>[0.0, -1.0],
    <number[]>[-1.0, 0.0],
    <number[]>[0.0, 1.0],
    <number[]>[1.0, 0.0],
  ];

  /**
   * The list of the three-dimensional gradient.
   *
   * @remarks
   * For the calculation of gradient contributions for three-dimensional Perlin noise,
   *  each vector contains two non-zero components,
   *  and a random vector is selected from them for dot product calculation when computing the gradient contributions.
   *
   * @privateRemarks
   * Hardcoded 12 three-dimensional gradient vectors, grouped by axis combination:
   * - Each vector has exactly two non-zero components
   * - The values of the non-zero components are ±1
   * - Cover all possible two-dimensional axis combinations
   *
   * @internal
   */
  private static readonly _gradient3d: number[][] = [
    <number[]>[1.0, 1.0, 0.0],
    <number[]>[-1.0, 1.0, 0.0],
    <number[]>[1.0, -1.0, 0.0],
    <number[]>[-1.0, -1.0, 0.0],
    <number[]>[1.0, 0.0, 1.0],
    <number[]>[-1.0, 0.0, 1.0],
    <number[]>[1.0, 0.0, -1.0],
    <number[]>[-1.0, 0.0, -1.0],
    <number[]>[0.0, 1.0, 1.0],
    <number[]>[0.0, -1.0, 1.0],
    <number[]>[0.0, 1.0, -1.0],
    <number[]>[0.0, -1.0, -1.0],
  ];

  /**
   * The list of the four-dimensional gradient.
   *
   * @remarks
   * For the calculation of gradient contributions for four-dimensional Perlin noise,
   *  each vector contains two non-zero components,
   *  and a random vector is selected from them for dot product calculation when computing the gradient contributions.
   *
   * @privateRemarks
   * Herdcoded 24 four-dimensional gradient vectors, grouped by axis combination:
   * - Each vector has exactly two non-zero components
   * - The values of the non-zero components are ±1
   * - Cover all possible two-dimensional axis combinations
   *
   * @internal
   */
  private static readonly _gradient4d: number[][] = [
    // The (0,1) axis
    <number[]>[1.0, 1.0, 0.0, 0.0],
    <number[]>[1.0, -1.0, 0.0, 0.0],
    <number[]>[-1.0, 1.0, 0.0, 0.0],
    <number[]>[-1.0, -1.0, 0.0, 0.0],

    // The (0,2) axis
    <number[]>[1.0, 0.0, 1.0, 0.0],
    <number[]>[1.0, 0.0, -1.0, 0.0],
    <number[]>[-1.0, 0.0, 1.0, 0.0],
    <number[]>[-1.0, 0.0, -1.0, 0.0],

    // The (0,3) axis
    <number[]>[1.0, 0.0, 0.0, 1.0],
    <number[]>[1.0, 0.0, 0.0, -1.0],
    <number[]>[-1.0, 0.0, 0.0, 1.0],
    <number[]>[-1.0, 0.0, 0.0, -1.0],

    // The (1,2) axis
    <number[]>[0.0, 1.0, 1.0, 0.0],
    <number[]>[0.0, 1.0, -1.0, 0.0],
    <number[]>[0.0, -1.0, 1.0, 0.0],
    <number[]>[0.0, -1.0, -1.0, 0.0],

    // The (1,3) axis
    <number[]>[0.0, 1.0, 0.0, 1.0],
    <number[]>[0.0, 1.0, 0.0, -1.0],
    <number[]>[0.0, -1.0, 0.0, 1.0],
    <number[]>[0.0, -1.0, 0.0, -1.0],

    // The (2,3) axis
    <number[]>[0.0, 0.0, 1.0, 1.0],
    <number[]>[0.0, 0.0, 1.0, -1.0],
    <number[]>[0.0, 0.0, -1.0, 1.0],
    <number[]>[0.0, 0.0, -1.0, -1.0],
  ];

  /**
   * Implement different order of the smoothstep function
   *
   * @remarks
   * Implement different order of the smoothstep function, see
   * {@link https://en.wikipedia.org/wiki/Smoothstep | the smoothstep wikipedia} for more.
   *
   * Support the orders：
   * - **Linear**：\`S0(x) = x\`
   * - **Cubic**：\`S1(x) = 3x² - 2x³\`
   * - **Quintic**：\`S2(x) = 6x⁵ - 15x⁴ + 10x³\`
   *
   * @param x - The input value should be between 0 and 1
   * @param order - The order of the smoothstep function defaults to quintic, following Ken Perlin’s improved idea from 2002.
   * @returns The smoothed value, with a return range of [0, 1].
   *
   * @example
   * ```typescript
   * // The order is quintic default
   * _smoothstep(0.5); // => 0.5
   *
   * // Set the order of the function.
   * _smoothstep(0.3, { order: SmoothstepOrder.Cubic });
   * ```
   *
   * @internal
   */
  private static _smoothstep(
    x: number,
    order: SmoothstepOrder = SmoothstepOrder.Quintic,
  ): number {
    if (x >= 1)
      return 1;
    if (x <= 0)
      return 0;

    switch (order) {
      case SmoothstepOrder.Linear:
      // Linear
        return x;
      case SmoothstepOrder.Cubic:
      // Cubic
        return x * x * (3 - 2 * x);
      case SmoothstepOrder.Quintic:
      // Quintic
        return x * x * x * (x * (x * 6 - 15) + 10);
      default:
        throw new Error(`Unsupport order: ${order}`);
    }
  }

  /**
   * Linear interpolation
   *
   * @remarks
   * To find the linear transition from a to b.
   *
   * @param x - Weight
   * @param a - Start value
   * @param b - End value
   * @returns A value within the interval [a, b]
   *
   * @privateRemarks
   * lerp(x, a, b) = a + (x * (b - a));
   *
   * @internal
   */
  private static _lerp(x: number, a: number, b: number): number {
    return a + (x * (b - a));
  }

  /**
   * Compute one-dimensional gradient contributions.
   * @remarks
   * Using [hash], randomly select a member from [_gradient1d] and multiply it with x.
   * @param hash - An integer used to select a member from _gradient1d.
   * @param x - A float used to multiply a member from [_gradient1d] to obtain the gradient contributions.
   * @returns The gradient contributions.
   *
   * @internal
   */
  private static _computGradient1d(hash: number, x: number): number {
    const i: number = hash % Perlin._gradient1d.length;
    return Perlin._gradient1d[i] * x;
  }

  /**
   * Compute two-dimensional gradient contributions.
   * @remarks
   * Using [hash], randomly select a member from [_gradient2d] and dot product it with (x, y).
   * @param hash - An integer used to select a member from _gradient2d.
   * @param x - The x-component of the vector involved in calculating the gradient contribution.
   * @param y - The y-component of the vector involved in calculating the gradient contribution.
   * @returns The gradient contributions.
   *
   * @internal
   */
  private static _computGradient2d(hash: number, x: number, y: number): number {
    const i: number = hash % Perlin._gradient2d.length;
    const vec2: number[] = Perlin._gradient2d[i];
    return vec2[0] * x + vec2[1] * y;
  }

  /**
   * Compute three-dimensional gradient contributions.
   * @remarks
   * Using [hash], randomly select a member from [_gradient3d] and dot product it with (x, y, z).
   * @param hash - An integer used to select a member from _gradient3d.
   * @param x - The x-component of the vector involved in calculating the gradient contribution.
   * @param y - The y-component of the vector involved in calculating the gradient contribution.
   * @param z - The z-component of the vector involved in calculating the gradient contribution.
   * @returns The gradient contributions.
   *
   * @internal
   */
  private static _computGradient3d(hash: number, x: number, y: number, z: number): number {
    const i: number = hash % Perlin._gradient3d.length;
    const vec3: number[] = Perlin._gradient3d[i];
    return vec3[0] * x + vec3[1] * y + vec3[2] * z;
  }

  /**
   * Compute four-dimensional gradient contributions.
   * @remarks
   * Using [hash], randomly select a member from [_gradient4d] and dot product it with (x, y, z, w).
   * @param hash - An integer used to select a member from _gradient3d.
   * @param x - The x-component of the vector involved in calculating the gradient contribution.
   * @param y - The y-component of the vector involved in calculating the gradient contribution.
   * @param z - The z-component of the vector involved in calculating the gradient contribution.
   * @param w - The w-component of the vector involved in calculating the gradient contribution.
   * @returns The gradient contributions.
   *
   * @internal
   */
  private static _computGradient4d(hash: number, x: number, y: number, z: number, w: number): number {
    const i: number = hash % Perlin._gradient4d.length;
    const vec4: number[] = Perlin._gradient4d[i];
    return vec4[0] * x + vec4[1] * y + vec4[2] * z + vec4[3] * w;
  }

  /**
   * Generate a one-dimensional Perlin noise.
   *
   * @param x - The position for generating one-dimensional Perlin noise.
   * @returns The Perlin noise value between -1 and 1.
   *
   * @example
   * ```typescript
   * const perlin = new Perlin();
   * perlin.noise1d(123.4); // Return the noise value between -1 and 1.
   * ```
   *
   * @public
   */
  public noise1d(
    x: number,
  ): number {
    // Get a reference to the static method for convenience, so that you don’t have to write Perlin.XX later.
    const _smoothstep = Perlin._smoothstep;
    const _computGradient1d = Perlin._computGradient1d;
    const _lerp = Perlin._lerp;
    // Get a reference to the instance method for convenience, so that you don’t have to write this.XX later.
    const smoothstepOrder = this.smoothstepOrder;
    const _perm = this._perm;

    // Get the integer coordinate of x on the number line and the offset from it.
    const xi: number = Math.floor(x);
    const xf: number = x - xi;

    // Perform smooth interpolation on the offset.
    const u: number = _smoothstep(
      xf,
      smoothstepOrder,
    );

    // Get the hash
    const a: number = _perm[xi % 256];
    const b: number = _perm[(xi + 1) % 256];

    // Get the gradient contribution.
    const va: number = _computGradient1d(a, xf);
    const vb: number = _computGradient1d(b, xf - 1); // xf-1 is the directed distance from xf to xi+1

    // Return the noise value
    return _lerp(u, va, vb);
  }

  /**
   * Generate a two-dimensional Perlin noise.
   *
   * @param x - The position on the x-axis for generating two-dimensional Perlin noise.
   * @param y - The position on the y-axis for generating two-dimensional Perlin noise.
   * @returns The Perlin noise value between -1 and 1.
   *
   * @example
   * ```typescript
   * const perlin = new Perlin();
   * perlin.noise2d(123.4, 432.1); // Return the noise value between -1 and 1.
   * ```
   *
   * @public
   */
  public noise2d(
    x: number,
    y: number,
  ): number {
    // Get a reference to the static method for convenience, so that you don’t have to write Perlin.XX later.
    const _smoothstep = Perlin._smoothstep;
    const _computGradient2d = Perlin._computGradient2d;
    const _lerp = Perlin._lerp;
    // Get a reference to the instance method for convenience, so that you don’t have to write this.XX later.
    const smoothstepOrder = this.smoothstepOrder;
    const _perm = this._perm;

    // Get the integer coordinate of x on the x-axis and the offset from it.
    let xi: number = Math.floor(x);
    const xf: number = x - xi;

    // Get the integer coordinate of y on the y-axis and the offset from it.
    let yi: number = Math.floor(y);
    const yf: number = y - yi;

    // Perform smooth interpolation on the offset.
    const ux: number = _smoothstep(
      xf,
      smoothstepOrder,
    );

    const uy: number = _smoothstep(
      yf,
      smoothstepOrder,
    );

    // Scale the index to prepare for obtaining the hash from _perm.
    xi = xi % 256;
    yi = yi % 256;

    // Obtain the hash of the positions of the four vertices of a square.
    // +1 is b; otherwise, it is a.
    const aa: number = _perm[_perm[xi] + yi];
    const ab: number = _perm[_perm[xi] + (yi + 1)];
    const ba: number = _perm[_perm[(xi + 1)] + yi];
    const bb: number = _perm[_perm[(xi + 1)] + (yi + 1)];

    // Obtain the gradient contribution of the positions of the four vertices of a square.
    const n00: number = _computGradient2d(aa, xf, yf);
    const n10: number = _computGradient2d(ba, xf - 1, yf);
    const n01: number = _computGradient2d(ab, xf, yf - 1);
    const n11: number = _computGradient2d(bb, xf - 1, yf - 1);

    // Bilinear interpolation y -> x
    return _lerp(
      uy,
      _lerp(ux, n00, n10),
      _lerp(ux, n01, n11),
    );
  }

  /**
   * Generate a three-dimensional Perlin noise.
   *
   * @param x - The position on the x-axis for generating three-dimensional Perlin noise.
   * @param y - The position on the y-axis for generating three-dimensional Perlin noise.
   * @param z - The position on the z-axis for generating three-dimensional Perlin noise.
   * @returns The Perlin noise value between -1 and 1.
   *
   * @example
   * ```typescript
   * const perlin = new Perlin();
   * perlin.noise3d(123.4, 432.1, 1.1); // Return the noise value between -1 and 1.
   * ```
   *
   * @public
   */
  public noise3d(
    x: number,
    y: number,
    z: number,
  ): number {
    // Get a reference to the static method for convenience, so that you don’t have to write Perlin.XX later.
    const _smoothstep = Perlin._smoothstep;
    const _computGradient3d = Perlin._computGradient3d;
    const _lerp = Perlin._lerp;
    // Get a reference to the instance method for convenience, so that you don’t have to write this.XX later.
    const smoothstepOrder = this.smoothstepOrder;
    const _perm = this._perm;

    // Get the integer coordinate of x on the x-axis and the offset from it.
    let xi: number = Math.floor(x);
    const xf: number = x - xi;

    // Get the integer coordinate of y on the y-axis and the offset from it.
    let yi: number = Math.floor(y);
    const yf: number = y - yi;

    // Get the integer coordinate of z on the z-axis and the offset from it.
    let zi: number = Math.floor(z);
    const zf: number = z - zi;

    // Perform smooth interpolation on the offset.
    const ux: number = _smoothstep(
      xf,
      smoothstepOrder,
    );

    const uy: number = _smoothstep(
      yf,
      smoothstepOrder,
    );

    const uz: number = _smoothstep(
      zf,
      smoothstepOrder,
    );

    // Scale the index to prepare for obtaining the hash from _perm.
    xi = xi % 256;
    yi = yi % 256;
    zi = zi % 256;

    // Get the hash of the positions of the eight vertices of the cube.
    // +1 is b; otherwise, it is a.
    const aaa: number = _perm[_perm[_perm[xi] + yi] + zi];
    const aba: number = _perm[_perm[_perm[xi] + yi + 1] + zi];
    const aab: number = _perm[_perm[_perm[xi] + yi] + zi + 1];
    const abb: number = _perm[_perm[_perm[xi] + yi + 1] + zi + 1];
    const baa: number = _perm[_perm[_perm[xi + 1] + yi] + zi];
    const bba: number = _perm[_perm[_perm[xi + 1] + yi + 1] + zi];
    const bab: number = _perm[_perm[_perm[xi + 1] + yi] + zi + 1];
    const bbb: number = _perm[_perm[_perm[xi + 1] + yi + 1] + zi + 1];

    // Get the gradient contribution of the positions of the eight vertices of the cube.
    const n000: number = _computGradient3d(aaa, xf, yf, zf);
    const n001: number = _computGradient3d(aab, xf, yf, zf - 1);
    const n010: number = _computGradient3d(aba, xf, yf - 1, zf);
    const n011: number = _computGradient3d(abb, xf, yf - 1, zf - 1);
    const n100: number = _computGradient3d(baa, xf - 1, yf, zf);
    const n101: number = _computGradient3d(bab, xf - 1, yf, zf - 1);
    const n110: number = _computGradient3d(bba, xf - 1, yf - 1, zf);
    const n111: number = _computGradient3d(bbb, xf - 1, yf - 1, zf - 1);

    // Trilinear interpolation z -> y -> x
    return _lerp(
      uz,
      _lerp(
        uy,
        _lerp(ux, n000, n100),
        _lerp(ux, n010, n110),
      ),
      _lerp(
        uy,
        _lerp(ux, n001, n101),
        _lerp(ux, n011, n111),
      ),
    );
  }

  /**
   * Generate a four-dimensional Perlin noise.
   *
   * @param x - The position on the x-axis for generating four-dimensional Perlin noise.
   * @param y - The position on the y-axis for generating four-dimensional Perlin noise.
   * @param z - The position on the z-axis for generating four-dimensional Perlin noise.
   * @param w - The position on the w-axis for generating four-dimensional Perlin noise.
   * @returns The Perlin noise value between -1 and 1.
   *
   * @example
   * ```typescript
   * const perlin = new Perlin();
   * perlin.noise4d(123.4, 432.1, 1.1, 2.2); // Return the noise value between -1 and 1.
   * ```
   *
   * @public
   */
  public noise4d(
    x: number,
    y: number,
    z: number,
    w: number,
  ): number {
    // Get a reference to the static method for convenience, so that you don’t have to write Perlin.XX later.
    const _smoothstep = Perlin._smoothstep;
    const _computGradient4d = Perlin._computGradient4d;
    const _lerp = Perlin._lerp;
    // Get a reference to the instance method for convenience, so that you don’t have to write this.XX later.
    const smoothstepOrder = this.smoothstepOrder;
    const _perm = this._perm;

    // Get the integer coordinate of x on the x-axis and the offset from it.
    let xi: number = Math.floor(x);
    const xf: number = x - xi;

    // Get the integer coordinate of y on the y-axis and the offset from it.
    let yi: number = Math.floor(y);
    const yf: number = y - yi;

    // Get the integer coordinate of z on the z-axis and the offset from it.
    let zi: number = Math.floor(z);
    const zf: number = z - zi;

    // Get the integer coordinate of w on the w-axis and the offset from it.
    let wi: number = Math.floor(w);
    const wf: number = w - wi;

    // Perform smooth interpolation on the offset.
    const ux: number = _smoothstep(
      xf,
      smoothstepOrder,
    );

    const uy: number = _smoothstep(
      yf,
      smoothstepOrder,
    );

    const uz: number = _smoothstep(
      zf,
      smoothstepOrder,
    );

    const uw: number = _smoothstep(
      wf,
      smoothstepOrder,
    );

    // Scale the index to prepare for obtaining the hash from _perm.
    xi = xi % 256;
    yi = yi % 256;
    zi = zi % 256;
    wi = wi % 256;

    // Obtain the hash of the positions of the sixteen vertices of a four-dimensional hypercube
    // +1 is b; otherwise, it is a.
    const aaaa: number = _perm[_perm[_perm[_perm[xi] + yi] + zi] + wi];
    const aaab: number = _perm[_perm[_perm[_perm[xi] + yi] + zi] + wi + 1];

    const aaba: number = _perm[_perm[_perm[_perm[xi] + yi] + zi + 1] + wi];
    const aabb: number = _perm[_perm[_perm[_perm[xi] + yi] + zi + 1] + wi + 1];

    const abaa: number = _perm[_perm[_perm[_perm[xi] + yi + 1] + zi] + wi];
    const abab: number = _perm[_perm[_perm[_perm[xi] + yi + 1] + zi] + wi + 1];

    const abba: number = _perm[_perm[_perm[_perm[xi] + yi + 1] + zi + 1] + wi];
    const abbb: number = _perm[_perm[_perm[_perm[xi] + yi + 1] + zi + 1] + wi + 1];

    const baaa: number = _perm[_perm[_perm[_perm[xi + 1] + yi] + zi] + wi];
    const baab: number = _perm[_perm[_perm[_perm[xi + 1] + yi] + zi] + wi + 1];

    const baba: number = _perm[_perm[_perm[_perm[xi + 1] + yi] + zi + 1] + wi];
    const babb: number = _perm[_perm[_perm[_perm[xi + 1] + yi] + zi + 1] + wi + 1];

    const bbaa: number = _perm[_perm[_perm[_perm[xi + 1] + yi + 1] + zi] + wi];
    const bbab: number = _perm[_perm[_perm[_perm[xi + 1] + yi + 1] + zi] + wi + 1];

    const bbba: number = _perm[_perm[_perm[_perm[xi + 1] + yi + 1] + zi + 1] + wi];
    const bbbb: number = _perm[_perm[_perm[_perm[xi + 1] + yi + 1] + zi + 1] + wi + 1];

    // Obtain the gradient contribution of the positions of the sixteen vertices of a four-dimensional hypercube
    const n0000: number = _computGradient4d(aaaa, xf, yf, zf, wf);
    const n0001: number = _computGradient4d(aaab, xf, yf, zf, wf - 1);
    const n0010: number = _computGradient4d(aaba, xf, yf, zf - 1, wf);
    const n0011: number = _computGradient4d(aabb, xf, yf, zf - 1, wf - 1);

    const n0100: number = _computGradient4d(abaa, xf, yf - 1, zf, wf);
    const n0101: number = _computGradient4d(abab, xf, yf - 1, zf, wf - 1);
    const n0110: number = _computGradient4d(abba, xf, yf - 1, zf - 1, wf);
    const n0111: number = _computGradient4d(abbb, xf, yf - 1, zf - 1, wf - 1);

    const n1000: number = _computGradient4d(baaa, xf - 1, yf, zf, wf);
    const n1001: number = _computGradient4d(baab, xf - 1, yf, zf, wf - 1);
    const n1010: number = _computGradient4d(baba, xf - 1, yf, zf - 1, wf);
    const n1011: number = _computGradient4d(babb, xf - 1, yf, zf - 1, wf - 1);

    const n1100: number = _computGradient4d(bbaa, xf - 1, yf - 1, zf, wf);
    const n1101: number = _computGradient4d(bbab, xf - 1, yf - 1, zf, wf - 1);
    const n1110: number = _computGradient4d(bbba, xf - 1, yf - 1, zf - 1, wf);
    const n1111: number = _computGradient4d(bbbb, xf - 1, yf - 1, zf - 1, wf - 1);

    // Quadrilinear interpolation w -> z -> y -> x
    return _lerp(
      uw,
      _lerp(
        uz,
        _lerp(
          uy,
          _lerp(ux, n0000, n1000),
          _lerp(ux, n0100, n1100),
        ),
        _lerp(
          uy,
          _lerp(ux, n0010, n1010),
          _lerp(ux, n0110, n1110),
        ),
      ),
      _lerp(
        uz,
        _lerp(
          uy,
          _lerp(ux, n0001, n1001),
          _lerp(ux, n0101, n1101),
        ),
        _lerp(
          uy,
          _lerp(ux, n0011, n1011),
          _lerp(ux, n0111, n1111),
        ),
      ),
    );
  }

  /**
   * Generate a one-dimensional FBM.
   *
   * @remarks
   * Fractal noise realizes more intricate details by overlaying various noise layers of distinct frequencies and amplitudes,
   *  making it applicable for scenarios that demand multi-scale detail like the creation of natural landscapes.
   *
   * @param x - The position for generating one-dimensional Perlin noise.
   * @param options - The configuration of the FBM, See {@link FractalOptions1D} for more.
   * @returns The normalized noise value, with a range from -1 to 1.
   *
   * @example
   * ```typescript
   * const perlin:Perlin = new Perlin();
   *
   * // The basic case
   * perlin.fractalNoise1d(0.5);
   *
   * // The advanced case
   * const options:FractalOptions1D = {
   *   octaves: 5,
   *   amplitude: 1.0,
   *   persistence: 1.5,
   *   frequency: {x: 0.001},
   *   lacunarity: {x: 2.0},
   *   offset: {x: 21.0},
   * }
   * perlin.fractalNoise1d(10, options);
   * ```
   *
   * @public
   */
  public fractalNoise1d(
    x: number,
    options: FractalOptions1D = {
      octaves: 1.0,
      amplitude: 1.0,
      persistence: 1.0,
      frequency: { x: 1.0 },
      lacunarity: { x: 1.0 },
      offset: { x: 0.0 },
    },
  ): number {
    const {
      octaves,
      amplitude,
      frequency,
      persistence,
      lacunarity,
      offset,
    } = options;

    if (octaves < 1)
      throw new Error('the octaves must greater than 1');

    let total = 0.0;
    let currentAmplitude = amplitude;
    let currentFrequency = frequency.x;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      const nx = (x + i * offset.x) * currentFrequency;

      const noiseValue = this.noise1d(nx);
      total += noiseValue * currentAmplitude;
      maxValue += currentAmplitude;
      currentFrequency *= lacunarity.x;
      currentAmplitude *= persistence;
    }

    return total / maxValue;
  }

  /**
   * Generate a two-dimensional FBM.
   *
   * @remarks
   * Fractal noise realizes more intricate details by overlaying various noise layers of distinct frequencies and amplitudes,
   *  making it applicable for scenarios that demand multi-scale detail like the creation of natural landscapes.
   *
   * @param x - The position on the x-axis for generating two-dimensional FBM.
   * @param y - The position on the y-axis for generating two-dimensional FBM.
   * @param options -  The configuration of the FBM, See {@link FractalOptions2D} for more.
   * @returns The normalized noise value, with a range from -1 to 1.
   *
   * @example
   * ```typescript
   * const perlin:Perlin = new Perlin();
   *
   * // The basic case
   * perlin.fractalNoise2d(0.5, 0.5);
   *
   * // The advanced case
   * const options:FractalOptions2D = {
   *   octaves: 5,
   *   amplitude: 1.0,
   *   persistence: 1.5,
   *   frequency: {x: 0.001, y: 0.001},
   *   lacunarity: {x: 2.0, y: 2.0},
   *   offset: {x: 21.0, y: 22.0},
   * }
   * perlin.fractalNoise2d(10, 11, options);
   * ```
   *
   * @public
   */
  public fractalNoise2d(
    x: number,
    y: number,
    options: FractalOptions2D = {
      octaves: 1.0,
      amplitude: 1.0,
      persistence: 1.0,
      frequency: { x: 1.0, y: 1.0 },
      lacunarity: { x: 1.0, y: 1.0 },
      offset: { x: 0.0, y: 0.0 },
    },
  ): number {
    const {
      octaves,
      amplitude,
      frequency,
      persistence,
      lacunarity,
      offset,
    } = options;

    if (octaves < 1)
      throw new Error('the octaves must greater than 1');

    let total = 0.0;
    let currentAmplitude = amplitude;
    let currentFrequencyX = frequency.x;
    let currentFrequencyY = frequency.y;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      const nx = (x + i * offset.x) * currentFrequencyX;
      const ny = (y + i * offset.y) * currentFrequencyY;

      const noiseValue = this.noise2d(nx, ny);
      total += noiseValue * currentAmplitude;
      maxValue += currentAmplitude;

      currentFrequencyX *= lacunarity.x;
      currentFrequencyY *= lacunarity.y;
      currentAmplitude *= persistence;
    }

    return total / maxValue;
  }

  /**
   * Generate a three-dimensional FBM.
   *
   * @remarks
   * Fractal noise realizes more intricate details by overlaying various noise layers of distinct frequencies and amplitudes,
   *  making it applicable for scenarios that demand multi-scale detail like the creation of natural landscapes.
   *
   * @param x - The position on the x-axis for generating three-dimensional FBM.
   * @param y - The position on the y-axis for generating three-dimensional FBM.
   * @param z - The position on the z-axis for generating three-dimensional FBM.
   * @param options -  The configuration of the FBM, See {@link FractalOptions3D} for more.
   * @returns The normalized noise value, with a range from -1 to 1.
   *
   * @example
   * ```typescript
   * const perlin:Perlin = new Perlin();
   *
   * // The basic case
   * perlin.fractalNoise3d(0.5, 0.5, 0.5);
   *
   * // The advanced case
   * const options:FractalOptions3D = {
   *   octaves: 5,
   *   amplitude: 1.0,
   *   persistence: 1.5,
   *   frequency: {x: 0.001, y: 0.001, z: 0.001},
   *   lacunarity: {x: 2.0, y: 2.0, z: 2.0},
   *   offset: {x: 21.0, y: 22.0, z: 23.0},
   * }
   * perlin.fractalNoise3d(10, 11, 12, options);
   * ```
   *
   * @public
   */
  public fractalNoise3d(
    x: number,
    y: number,
    z: number,
    options: FractalOptions3D = {
      octaves: 1.0,
      amplitude: 1.0,
      persistence: 1.0,
      frequency: { x: 1.0, y: 1.0, z: 1.0 },
      lacunarity: { x: 1.0, y: 1.0, z: 1.0 },
      offset: { x: 0.0, y: 0.0, z: 0.0 },
    },
  ): number {
    const {
      octaves,
      amplitude,
      frequency,
      persistence,
      lacunarity,
      offset,
    } = options;

    if (octaves < 1)
      throw new Error('the octaves must greater than 1');

    let total = 0.0;
    let currentAmplitude = amplitude;
    let currentFrequencyX = frequency.x;
    let currentFrequencyY = frequency.y;
    let currentFrequencyZ = frequency.z;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      const nx = (x + i * offset.x) * currentFrequencyX;
      const ny = (y + i * offset.y) * currentFrequencyY;
      const nz = (z + i * offset.z) * currentFrequencyZ;

      const noiseValue = this.noise3d(nx, ny, nz);
      total += noiseValue * currentAmplitude;
      maxValue += currentAmplitude;

      currentFrequencyX *= lacunarity.x;
      currentFrequencyY *= lacunarity.y;
      currentFrequencyZ *= lacunarity.z;
      currentAmplitude *= persistence;
    }

    return total / maxValue;
  }

  /**
   * Generate a four-dimensional FBM.
   *
   * @remarks
   * Fractal noise realizes more intricate details by overlaying various noise layers of distinct frequencies and amplitudes,
   *  making it applicable for scenarios that demand multi-scale detail like the creation of natural landscapes.
   *
   * @param x - The position on the x-axis for generating four-dimensional FBM.
   * @param y - The position on the y-axis for generating four-dimensional FBM.
   * @param z - The position on the z-axis for generating four-dimensional FBM.
   * @param w - The position on the w-axis for generating four-dimensional FBM.
   * @param options -  The configuration of the FBM, See {@link FractalOptions4D} for more.
   * @returns The normalized noise value, with a range from -1 to 1.
   *
   * @example
   * ```typescript
   * const perlin:Perlin = new Perlin();
   *
   * // The basic case
   * perlin.fractalNoise4d(0.5, 0.5, 0.5, 0.5);
   *
   * // The advanced case
   * const options:FractalOptions4D = {
   *   octaves: 5,
   *   amplitude: 1.0,
   *   persistence: 1.5,
   *   frequency: {x: 0.001, y: 0.001, z: 0.001, w: 0.001},
   *   lacunarity: {x: 2.0, y: 2.0, z: 2.0, w: 2.0},
   *   offset: {x: 21.0, y: 22.0, z: 23.0, w: 24.0},
   * }
   * perlin.fractalNoise4d(10, 11, 12, 13, options);
   * ```
   *
   * @public
   */
  public fractalNoise4d(
    x: number,
    y: number,
    z: number,
    w: number,
    options: FractalOptions4D = {
      octaves: 1.0,
      amplitude: 1.0,
      persistence: 1.0,
      frequency: { x: 1.0, y: 1.0, z: 1.0, w: 1.0 },
      lacunarity: { x: 1.0, y: 1.0, z: 1.0, w: 1.0 },
      offset: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
    },
  ): number {
    const {
      octaves,
      amplitude,
      frequency,
      persistence,
      lacunarity,
      offset,
    } = options;

    if (octaves < 1)
      throw new Error('the octaves must greater than 1');

    let total = 0.0;
    let currentAmplitude = amplitude;
    let currentFrequencyX = frequency.x;
    let currentFrequencyY = frequency.y;
    let currentFrequencyZ = frequency.z;
    let currentFrequencyW = frequency.w;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      const nx = (x + i * offset.x) * currentFrequencyX;
      const ny = (y + i * offset.y) * currentFrequencyY;
      const nz = (z + i * offset.z) * currentFrequencyZ;
      const nw = (w + i * offset.w) * currentFrequencyW;

      const noiseValue = this.noise4d(nx, ny, nz, nw);
      total += noiseValue * currentAmplitude;
      maxValue += currentAmplitude;

      currentFrequencyX *= lacunarity.x;
      currentFrequencyY *= lacunarity.y;
      currentFrequencyZ *= lacunarity.z;
      currentFrequencyW *= lacunarity.w;
      currentAmplitude *= persistence;
    }

    return total / maxValue;
  }
}
