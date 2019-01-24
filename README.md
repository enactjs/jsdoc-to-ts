# Converts JSDoc comments into TypeScript d.ts files

## Usage

Assuming this directory is a peer of the Enact source and you want to write this into an installed (from npm) version of enact:

```bash
node -e "['core', 'ui', 'moonstone', 'i18n', 'webos', 'spotlight'].forEach(p => require('.')({
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
}))"
```
NOTE: Replace `<path to installation>` with the directory you wish to update.

## Working with Linked Enact

The following command will parse the Enact source into a local `types` directory so you can use TypeScript with linked Enact:
```bash
node -e "['core', 'ui', 'moonstone', 'i18n', 'webos', 'spotlight'].forEach(p => require('.')({
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
}))"
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
