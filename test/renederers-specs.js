// eslint-disable-next-line no-shadow
import {expect} from 'expect';

import {getDefaultRenderers, defaultModuleRenderer, defaultHocRenderer, defaultFunctionRenderer} from '../src/renderers.js';

import {
	emptyModule, emptyModuleOutput,
	completeHoc, completeHocOutput,
	simpleFunction, simpleFunctionOutput
} from './data.js';

function log () {}
log.warn = () => {};
log.info = () => {};

describe('renderers', function () {

	describe ('getDefaultRenderers', function () {
		it('should return an object', function () {
			const expected = 'object';
			const actual = typeof getDefaultRenderers();
			expect(actual).toBe(expected);
		});

		it('should allow customizing the object', function () {
			const overrideFunc = () => {};
			const view = getDefaultRenderers({module: overrideFunc});

			const expected = overrideFunc;
			const actual = view.module;
			expect(actual).toBe(expected);
		});
	});

	describe('defaultModuleRenderer', function () {
		it('should render only header if no members', async function () {
			const renderer = () => [];

			const expected = emptyModuleOutput;
			const view = await defaultModuleRenderer({section: emptyModule, parent: emptyModule, root: emptyModule, log, renderer});
			expect(view).toBe(expected);
		});
	});

	describe('defaultHocRenderer', function () {
		it('should a complete hoc', async function () {
			const expected = completeHocOutput;
			const view = await defaultHocRenderer({section: completeHoc, parent: completeHoc, root: completeHoc, log});
			expect(view).toBe(expected);
		});
	});

	describe('defaultFunctionRenderer', function () {
		it('should render a simple function definition', function () {
			const expected = simpleFunctionOutput;
			const view = defaultFunctionRenderer({section: simpleFunction, parent: simpleFunction, root: simpleFunction, log});
			expect(view).toBe(expected);
		});
	});
});
