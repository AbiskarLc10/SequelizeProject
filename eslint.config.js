// eslint.config.js
module.exports = [
  {
    rules: {
     "semi": "error",
      "prefer-const": "error",
      "array-callback-return": "error",
      "curly": ["error", "all"],
    },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "script",
    },
  },
];
