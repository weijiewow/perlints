// eslint.config.js
import antfu from '@antfu/eslint-config';
import tsdocPlugin from 'eslint-plugin-tsdoc';

export default antfu({
  type: 'lib',
  plugins: {
    tsdoc: tsdocPlugin,
  },
  rules: {
    // Enable TSDoc
    'tsdoc/syntax': 'warn',
  },
  // Do not lint the tool generations.
  ignores: ['doc/*.md', 'node_modules/*', 'temp/*', 'pages/*', 'dist/*'],
}, {
  files: ['**/*.ts', '**/*.js'],
  rules: {
    // Most of antfu’s rules I can accept, except those without semicolons.
    'style/semi': ['error', 'always'],
    // Use type instead of interface, as VSCode sometimes does not prompt the content of members within an interface.
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'type',
    ],
  },
});
