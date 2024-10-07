// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["import", "prettier"],
  rules: {
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
