const {
  flow,
  map,
  join,
} = require('lodash/fp');

const ignorePatterns = [
  "import\\s+(?:\\w+\\s+|(?:\\w+,\\s+)?\\{)(?:\\w+(?:,\\s+)?)*from\\s+'.*",
  "jest.mock\\('.*",
];
const ignorePattern = flow(
  map((it) => `(${it})`),
  join('|'),
)(ignorePatterns);

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  env: {
    browser: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  rules: {
    'linebreak-style': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignorePattern,
      },
    ],
  },
  overrides: [{
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/prefer-default-export': 'warn',
      'react/require-default-props': 'off',
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
        generics: 'ignore',
        tuples: 'always-multiline',
      }],
      'jsx-a11y/click-events-have-key-events': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['off', {
        allowShortCircuit: true,
        allowTernary: true,
      }],
      'no-return-assign': ['error', 'except-parens'],
      radix: 'off',
      'class-methods-use-this': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  }, {
    files: ['**/*.spec.ts', '**/*.spec.tsx', './test/**/*.ts'],
    rules: {
      'react/no-this-in-sfc': 'off',
      camelcase: 'off',
      '@typescript-eslint/naming-convention': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-param-reassign': 'off',
    },
    env: {
      jest: true,
    },
  }, {
    files: ['**/styles.ts', '**/styles.tsx'],
    rules: {
      'import/prefer-default-export': 'off',
    },
  }, {
    files: ['./*.js', './.eslintrc.js', './stories/**', './src/data/**', './test/**'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'max-classes-per-file': 'off',
    },
    env: {
      node: true,
    },
  }],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
