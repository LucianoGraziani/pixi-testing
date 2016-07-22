import expect from 'expect';

import PixiLoader from 'tools/PixiLoader';
import LoaderMock from 'mocks/LoaderMock';

const successfullResource = 'some/success/url.json';
const failureResource = 'some/fail/url.json';
const errorMessage = 'resource not found';
const loaderMock = new LoaderMock('fail', errorMessage);

describe('Tool: PixiLoader', () => {
	let pixiLoader;
	let successPromise;
	let failPromise;

	beforeEach(() => {
		pixiLoader = new PixiLoader(loaderMock);
		successPromise = pixiLoader.load(successfullResource);
		failPromise = pixiLoader.load(failureResource);
	});

	it('has to return a Promise ALWAYS', () => {
		expect(successPromise).toBeA(Promise);
		expect(failPromise).toBeA(Promise);
	});
	it('has to load a resource', (done) => {
		const successSpy = expect.createSpy();

		successPromise.then((resource) => {
			expect(resource).toExist();
			expect(resource).toBe(true);
			done();
		}, successSpy);

		setTimeout(() => {
			expect(successSpy).toNotHaveBeenCalled();
		}, 2);
	});
	it('has NOT to load a failure url resource', (done) => {
		const failSpy = expect.createSpy();

		failPromise.then(failSpy, (err) => {
			expect(err).toBeA(ReferenceError);
			expect(err.message).toEqual(errorMessage);
			done();
		});

		setTimeout(() => {
			expect(failSpy).toNotHaveBeenCalled();
		}, 2);
	});
});
