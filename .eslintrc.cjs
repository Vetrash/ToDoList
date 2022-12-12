module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': {
      typescript: { directory: './tsconfig.json' },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prefer-stateless-function': 'off',
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'no-console': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'react/no-unknown-property': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  ignorePatterns: ['build/', 'dist/', 'docs/', 'server/', 'node_modules/'],
};

/* module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prefer-stateless-function': 'off',
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'react/no-unknown-property': 'off',
  },
}; */
