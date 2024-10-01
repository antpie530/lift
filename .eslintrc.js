// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["import", "prettier"],
  rules: {
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent', 'index'],
        ],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ],
    "prettier/prettier": ["error", {
      tabWidth: 4
    }]
  },
  settings: {
    alias: {
      map: [
        ['@', './lift']
      ]
    }
  },
};
