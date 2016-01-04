clean:
	rm -rf build

test:
	eslint -c .eslintrc.json src/

serve:
	./node_modules/http-server/bin/http-server ./build

build: clean
	gulp
