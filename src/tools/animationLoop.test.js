import expect from 'expect';

import animationLoop, { EventColl } from 'tools/animationLoop';

describe('Tool: animationLoop', () => {
	describe('EventColl', () => {
		it('properties cannot be modified', (done) => {
			try {
				EventColl.add = 'something is bad if it is assigned';
			} catch (err) {
				expect(err).toBeA(TypeError);
				done();
			}
			done(new Error('The `add` property has been modified!'));
		});
		it('cannot be added properties', (done) => {
			try {
				EventColl.newProperty = 'something is bad if it is assigned';
			} catch (err) {
				expect(err).toBeA(TypeError);
				done();
			}
			done(new Error('The `newProperty` has been added and wasn`t spected!'));
		});

		describe('@add and @remove methods', () => {
			let id;

			it('adds an event', () => {
				id = EventColl.add(f => f);

				expect(id).toBeA('string');
			});
			it('deletes an existing event', (done) => {
				try {
					EventColl.remove(id);
				} catch (err) {
					done(err);
				}
				done();
			});

			it('throws a TypeError when trying to add anything than a function', (done) => {
				try {
					EventColl.add();
				} catch (err) {
					expect(err).toBeA(TypeError);
					done();
				}
				done(new Error('`event` must be a function, instead you setted something different'));
			});
			it('throws a ReferenceError when trying to delete a function with unknown ID', (done) => {
				try {
					EventColl.remove(1);
				} catch (err) {
					expect(err).toBeA(ReferenceError);
					done();
				}
				done(new Error('It cannot be OK if doesn`t say anything about not deleting an non-existent function'));
			});
		});
	});

	describe('API', () => {
		describe('onStart', () => {
			const rendererMock = {
				render() {},
			};

			it('starts the animation loop', () => {
				/**
				 * I don't care what kind of renderer I use,
				 * and what container I'm going to render.
				 * That's why I use a mock.
				 */
				animationLoop.startLoop(rendererMock);
			});
			it('executes the event', (done) => {
				const spy = expect.createSpy();

				EventColl.add(spy);
				setTimeout(() => {
					expect(spy).toHaveBeenCalled();
					done();
				}, 1);
			});
			it('throws a ReferenceError when trying to re-start the animation loop', (done) => {
				try {
					animationLoop.startLoop(rendererMock);
				} catch (err) {
					expect(err).toBeA(ReferenceError);
					done();
				}
				done(new Error('It is supposed to throw a ReferenceError if the animationLoop is actually running.'));
			});
		});

		describe('onStop', () => {
			it('cancels the animation loop', () => {
				// Nothing to expect if something bad happens it will be a thrown Error
				animationLoop.stopLoop();
			});
			it('throws a ReferenceError when trying to stop an non-existent loop', (done) => {
				try {
					animationLoop.stopLoop();
				} catch (err) {
					expect(err).toBeA(ReferenceError);
					done();
				}
				done(new Error('It is supposed to throw a ReferenceError if the animationLoop is non-existent.'));
			});
		});
	});
});
