const config = {
  '*.{js,mjs,cjs,jsx,ts,tsx}': ['eslint --fix --max-warnings 0', 'prettier --write'],
  '*.{css,scss}': ['stylelint --fix --max-warnings 0', 'prettier --write'],
  '*.graphql': ['prettier --write'],
  'package.json': ['prettier --write'],
}

export default config
