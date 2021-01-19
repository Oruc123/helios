.PHONY: watch
watch:
	npm run start

.PHONY: watch-dev
watch-dev:
	npm run start-dev

.PHONY: install
install:
	yarn install

.PHONY: test
test:
	npm run test
