module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    'consistent-return': 'warn',
    eqeqeq: 'warn',
    'class-methods-use-this': 'off',
    'guard-for-in': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'no-cond-assign': 'warn',
    'no-loop-func': 'warn',
    'no-multi-assign': 'warn',
    'no-param-reassign': 'warn',
    'no-plusplus': 'warn',
    'no-restricted-syntax': 'warn',
    'no-underscore-dangle': 'off',
    'object-shorthand': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'react/no-unused-state': 'warn',
    'react/sort-comp': 'off',
    'dot-notation': 'warn',
    'prefer-template': 'warn',
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/no-loop-func': 'warn',
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        // 'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
