/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
  plugins: ['stylelint-order'],
  rules: {
    // additional rules
    'order/properties-alphabetical-order': true,
  },
};
