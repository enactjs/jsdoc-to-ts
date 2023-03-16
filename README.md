## @enact/jsdoc-to-ts [![NPM](https://img.shields.io/npm/v/@enact/jsdoc-to-ts.svg?style=flat-square)](https://www.npmjs.com/package/@enact/jsdoc-to-ts)

> Converts JSDoc comments into TypeScript d.ts files

> Note. It's an experimental module.

### Installation

```
npm install --save-dev @enact/jsdoc-to-ts
```

## Usage

Assuming this directory is a peer of the Enact source and you want to write this into an installed (from npm) version of enact:

```bash
node -e "import('./index.js').then((jsdocToTs) => {
  ['core', 'ui', 'moonstone', 'i18n', 'webos', 'spotlight'].forEach(p => jsdocToTs.default({
    package: '../enact/packages/' + p,
    output: require('fs').writeFileSync,
    ignore: ['node_modules', 'ilib'],
    importMap: {
      ui: '@enact/ui',
      moonstone: '@enact/moonstone',
      core: '@enact/core',
      webos: '@enact/webos',
      spotlight: '@enact/spotlight',
      i18n: '@enact/i18n'
    },
    outputPath: '<path to installation>/node_modules/@enact/' + p
  }))
}"
```
NOTE: Replace `<path to installation>` with the directory you wish to update.

## Working with Linked Enact

The following command will parse the Enact source into a local `types` directory so you can use TypeScript with linked Enact:
```bash
node -e "import('./index.js').then((jsdocToTs) => {
    ['core', 'ui', 'moonstone', 'i18n', 'webos', 'spotlight'].forEach(p => jsdocToTs.default('.')({
    package: '<path to enact>/packages/' + p,
    output: (filepath, content) => {
      const path = require('path');
      const dir = path.dirname(filepath);
      const wfs = require('fs').writeFileSync;
      // recursively create the path to the folder in types
      require('mkdirp').sync(dir);
      // write a package.json with a types member pointing to the .d.ts file
      wfs(path.join(dir, 'package.json'), '{\"types\": \"' + path.basename(filepath) + '\"}');
      // write the .d.ts file
      wfs(filepath, content);
    },
    importMap: {
      ui: '@enact/ui',
      moonstone: '@enact/moonstone',
      core: '@enact/core',
      webos: '@enact/webos',
      spotlight: '@enact/spotlight',
      i18n: '@enact/i18n'
    },
    outputPath: '<path to installation>/types/@enact/' + p
  }))
}"
```

You also have to configure the app to resolve the generated typings by adding the following to the `tsconfig.json`.

```
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": [
                "*",
                "types/*"
            ]
        }
    }
```

## Assumptions

Many assumptions, currently:

* Modules will be the root level component (documented with `@module`).
* Higher-order components will be documented with `@hoc` tag (documenting the parameters and returns of the hoc should result in successful conversion, too).
* Assumes you're using React and will inject React import into everything.

### Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2018-2023 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content,
including all source code files and documentation files in this repository are:
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this content except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
