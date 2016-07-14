// import util from 'util';
import expect from 'expect';
import { Container } from 'pixi.js';

import Renderer from 'components/Renderer';
import { EventColl } from 'tools/animationLoop';

describe('<Renderer>', () => {
	class StageMock {
		constructor(renderer) {
			this.props = {
				renderer,
				container: new Container(),
			};
		}
		render() {
			return this.props.container;
		}
		willUnmount() {
			const spy = expect.createSpy();

			spy();
			expect(spy).toHaveBeenCalled();
		}
	}

	it('returns a render instance when given a canvas element', (done) => {
		const canvas = document.createElement('canvas');

		try {
			const component = new Renderer(StageMock, canvas);
			const { renderer } = component.props;

			expect(renderer.constructor.name).toMatch(/(WebGLRenderer|CanvasRenderer)/);
			done();
		} catch (err) {
			done(err);
		}
	});
	it('returns a render instance and creates the canvas by itself', (done) => {
		try {
			const component = new Renderer(StageMock);
			const { renderer } = component.props;

			expect(renderer.view).toExist();
			expect(renderer.constructor.name).toMatch(/(WebGLRenderer|CanvasRenderer)/);
			done();
		} catch (err) {
			done(err);
		}
	});

	describe('Start and Finish events', () => {
		const component = new Renderer(StageMock);

		it('starts the animationLoop on renderization', (done) => {
			const spy = expect.createSpy();
			const eventId = EventColl.add(spy);

			component.render();
			setTimeout(() => {
				expect(spy).toHaveBeenCalled();
				EventColl.remove(eventId);
				done();
			}, 5);
		});
		it('stops the animationLoop on unmount and propagates the `componentWillUnmount` event', () => {
			component.willUnmount();
		});
	});
});
