/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
