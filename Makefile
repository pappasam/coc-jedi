build:
	yarn install --frozen-lockfile
	yarn build

publish: build
	yarn publish
