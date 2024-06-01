/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-clean-order",

  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [ 'extend' ],
    }],
  }
}
