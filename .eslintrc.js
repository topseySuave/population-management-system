module.exports = {
  extends: [
    "airbnb-base",
  ],
  parser: "babel-eslint",
  env: {
    "node": true,
    "es6": true,
  },
  rules: {
    "import/prefer-default-export": 0,
    "max-lines-per-function": ["error", 35],
    "no-console": 0,
    "no-underscore-dangle": 0,
    "func-names": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0
  }
};
