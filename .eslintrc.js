// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["import", "prettier"],
  rules: {
    'import/order': [
      'error',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ],
    "prettier/prettier": ["error", {
      tabWidth: 4
    }]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './lift']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
};
