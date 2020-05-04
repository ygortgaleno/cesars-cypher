module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "import/extensions": [
      "error",
      {
        "js": "never",
        "ts": "never",
      }
   ],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts"]
      }
    }
  },
};
