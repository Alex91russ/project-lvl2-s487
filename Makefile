install:
		npm install
start:
		npx babel-node src/bin/gendiff.js
test:
		npm test
publish:
		npm publish --dry-run
lint:
		npx eslint .