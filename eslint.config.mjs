// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import boundaries from 'eslint-plugin-boundaries'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

const layerTypes = ['app', 'pages', 'widgets', 'features', 'entities', 'shared', 'design-system']

const boundariesRules = layerTypes.map((type) => {
  const allow = [
    { module: { origin: 'external' } },
    {
      element: {
        types: {
          anyOf:
            type === 'design-system'
              ? ['design-system']
              : type === 'shared'
                ? ['shared', 'design-system']
                : type === 'entities'
                  ? ['entities', 'shared', 'design-system']
                  : type === 'features'
                    ? ['features', 'entities', 'shared', 'design-system']
                    : type === 'widgets'
                      ? ['widgets', 'features', 'entities', 'shared', 'design-system']
                      : ['app', 'pages', 'widgets', 'features', 'entities', 'shared', 'design-system'],
        },
      },
    },
  ]

  return {
    from: { element: { type } },
    allow: { to: allow },
  }
})

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'build/**',
      'dist/**',
      'storybook-static/**',
      'node_modules/**',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      '@typescript-eslint': tseslint,
      boundaries,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'design-system', pattern: 'packages/design-system/**' },
      ],
    },
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      ...eslintPluginReact.configs.flat['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: boundariesRules,
        },
      ],
      'react/prop-types': 'off',
    },
  },
  {
    files: ['vite.config.ts', '.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  eslintPluginPrettierRecommended,
  ...storybook.configs["flat/recommended"]
];
