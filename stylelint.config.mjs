const stylelintConfig = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'color-hex-length': null,
    'custom-property-pattern': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'source',
          'config',
          'plugin',
          'apply',
          'tailwind',
        ],
      },
    ],
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  overrides: [
    {
      // Global Tailwind v4 entrypoint: relax ordering-related rules that conflict
      // with CSS-first Tailwind config blocks (@theme, @utility, @layer) to keep
      // the strict mode intact for the rest of the codebase.
      files: ['app/globals.css'],
      rules: {
        'order/properties-order': null,
        'order/properties-alphabetical-order': null,
        'at-rule-empty-line-before': null,
        'declaration-empty-line-before': null,
        'rule-empty-line-before': null,
        'no-descending-specificity': null,
      },
    },
  ],
}

export default stylelintConfig
