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

The following command will parse the Enact source into the Enact source so you can use TypeScript with linked Enact:
```bash
node -e "['core', 'ui', 'moonstone', 'i18n', 'webos', 'spotlight'].forEach(p => require('.')({
  package: '../enact/packages/' + p,
  output: require('fs').writeFileSync,
  ignore: ['node_modules', 'ilib'],
  importMap: {
    ui: p === 'ui' ? '..' : '@enact/ui',
    moonstone: p === 'moonstone' ? '..' : '@enact/moonstone',
    core: p === 'core' ? '..' : '@enact/core',
    webos: p === 'webos' ? '..' : '@enact/webos',
    spotlight: p === 'spotlight' ? '..' : '@enact/spotlight',
    i18n: p === 'i18n' ? '..' : '@enact/i18n'
  }
}))"
```
## Assumptions

Many assumptions, currently:

* Modules will be the root level component (documented with `@module`).
* Higher-order components will be documented with `@hoc` tag (documenting the parameters and returns of the hoc should result in successful conversion, too).
* Assumes you're using React and will inject React import into everything.
