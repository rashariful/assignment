import eslintPluginImport from 'eslint-plugin-import';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: true,
        process: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: eslintPluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // Change to 'off' if you want to allow 'any'
    },
  },
];
