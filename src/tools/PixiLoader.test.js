import expect from 'expect';

import PixiLoader from 'tools/PixiLoader';
import LoaderMock from 'mocks/LoaderMock';

const successfullResource = 'some/success/url.json';
const failureResource = 'some/fail/url.json';
const errorMessage = 'resource not found';
const loaderMock = new LoaderMock(successfullResource, 'fail', errorMessage);

describe('Tool: pixiLoader', () => {
	const pixiLoader = new PixiLoader(loaderMock);
	const successPromise = pixiLoader.load(successfullResource);
	const failPromise = pixiLoader.load(failureResource);

	it('has to return a Promise ALWAYS', () => {
		expect(successPromise).toBeA(Promise);
		expect(failPromise).toBeA(Promise);
	});
	it('has to load a resource', (done) => {
		const successSpy = expect.createSpy();

		successPromise.then((resource) => {
			setTimeout(() => {
				expect(resource).toExist();
				expect(resource).toBe(true);
				done();
			}, 5);
		}, successSpy);

		setTimeout(() => {
			expect(successSpy).toNotHaveBeenCalled();
		}, 2);
	});
	it('has NOT to load a failure url resource', (done) => {
		const failSpy = expect.createSpy();

		failPromise.then(failSpy, (err) => {
			setTimeout(() => {
				expect(err).toBeA(ReferenceError);
				expect(err.message).toEqual(errorMessage);
				done();
			}, 5);
		});

		setTimeout(() => {
			expect(failSpy).toNotHaveBeenCalled();
		}, 2);
	});
});
