// eslint-disable-next-line no-shadow
const expect = require('chai').expect;

const {getDefaultRenderers, defaultModuleRenderer, defaultHocRenderer, defaultFunctionRenderer} = require('../src/renderers');

const {
	emptyModule, emptyModuleOutput,
	completeHoc, completeHocOutput,
	simpleFunction, simpleFunctionOutput
} = require('./data');

function log () {}
log.warn = () => {};
log.info = () => {};

describe('renderers', function () {

	describe ('getDefaultRenderers', function () {
		it('should return an object', function () {
			const expected = 'object';
			const actual = typeof getDefaultRenderers();
			expect(actual).to.equal(expected);
		});

		it('should allow customizing the object', function () {
			const overrideFunc = () => {};
			const renderer = getDefaultRenderers({module: overrideFunc});

			const expected = overrideFunc;
			const actual = renderer.module;
			expect(actual).to.equal(expected);
		});
	});

	describe('defaultModuleRenderer', function () {
		it('should render only header if no members', function () {
			const renderer = () => [];

			const expected = emptyModuleOutput;
			const actual = defaultModuleRenderer({section: emptyModule, parent: emptyModule, root: emptyModule, log, renderer});
			expect(actual).to.equal(expected);
		});
	});

	describe('defaultHocRenderer', function () {
		it('should a complete hoc', function () {
			const expected = completeHocOutput;
			const actual = defaultHocRenderer({section: completeHoc, parent: completeHoc, root: completeHoc, log});
			expect(actual).to.equal(expected);
		});
	});

	describe('defaultFunctionRenderer', function () {
		it('should render a simple function definition', function () {
			const expected = simpleFunctionOutput;
			const actual = defaultFunctionRenderer({section: simpleFunction, parent: simpleFunction, root: simpleFunction, log});
			expect(actual).to.equal(expected);
		});
	});
});
