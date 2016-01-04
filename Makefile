build_tmp = ../tmp/menuexperimentbuild/;

clean:
	rm -rf build

install:
	npm install

test:
	eslint -c .eslintrc.json src/

deploy: build
	rm -rf $(build_tmp)
	mkdir -p $(build_tmp)
	cp -r build/* $(build_tmp)
	git checkout --orphan gh-pages
	git clean -df
	git rm -r --cached .
	#(for x in $$(find $$build_tmp -type f -printf '%P\n'); do git add "$$x"; done);
	cp $(build_tmp) .
	git add .
	git commit -m "latest deploy"
	git push -f

serve: build
	./node_modules/http-server/bin/http-server ./build

build: clean
	gulp
