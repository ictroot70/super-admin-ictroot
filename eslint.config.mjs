import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'arrow-parens': 'off',
      'consistent-return': 'off',
      curly: ['error', 'all'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          css: 'always',
          json: 'always',
          js: 'never',
          jsx: 'never',
          scss: 'always',
          svg: 'always',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'max-lines': ['error', 300],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'off',
      'no-duplicate-imports': 'error',
      'no-empty-pattern': 'off',
      'no-nested-ternary': 'error',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
      ],
      // Phase 2: strict CI (lint:ci runs with --max-warnings 0).
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
          ],
          newlinesBetween: 1,
          order: 'asc',
          type: 'natural',
        },
      ],
      'prefer-const': 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error'],
      // Phase 2: strict CI.
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'ignore', propElementValues: 'always', props: 'always' },
      ],
      'react/jsx-fragments': ['error'],
      'react/prop-types': 'off',
      'react/void-dom-elements-no-children': ['error'],
      // Phase 1: explicit warn to avoid false-positive noise in Apollo v4 hooks and Zustand selectors.
      'react-hooks/exhaustive-deps': 'warn',
      // Phase 1: warn; promote to error in Phase 2 once asset pipeline is stabilized.
      '@next/next/no-img-element': 'warn',
      // FSD dependency direction from .ai/policy.md:
      //   app -> features, entities, shared
      //   features -> entities, shared
      //   entities -> shared
      //   shared -> shared
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './shared',
              from: ['./app', './features', './entities'],
              message:
                'FSD: shared must not import from app/features/entities (see .ai/policy.md).',
            },
            {
              target: './entities',
              from: ['./app', './features'],
              message: 'FSD: entities must not import from app/features (see .ai/policy.md).',
            },
            {
              target: './features',
              from: ['./app'],
              message: 'FSD: features must not import from app (see .ai/policy.md).',
            },
          ],
        },
      ],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      // FSD without /src: rely on typescript resolver for `@/*` aliases (tsconfig paths)
      // and on node resolver for bare imports.
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs,cjs,ts}'],
    rules: {
      'no-console': 'off',
      'max-lines': 'off',
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Project-specific:
    'coverage/**',
    'shared/api/graphql/generated/**',
  ]),
])

export default eslintConfig
