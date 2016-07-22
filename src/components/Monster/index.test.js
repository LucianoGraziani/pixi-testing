import expect from 'expect';
import { Sprite } from 'pixi.js';

import LoaderMock from 'mocks/LoaderMock';
import PixiLoader from 'tools/PixiLoader';
import Monster from 'components/Monster';

describe('<Monster>', () => {
	let monster;
	let spy;

	beforeEach(() => {
		spy = expect.createSpy();
		monster = new Monster(new PixiLoader(new LoaderMock('fail', 'resource not found', spy)));
	});
	it('has a pixiLoader instance as props', () => {
		expect(monster.props.pixiLoader).toBeA(PixiLoader);
	});
	it('returns a Promise on render', () => {
		const rendererPromise = monster.render();

		expect(rendererPromise).toBeA(Promise);
	});
	it('renderers promise returns a Sprite model', (done) => {
		const rendererPromise = monster.render();

		rendererPromise.then((model) => {
			expect(model).toBeA(Sprite);
			expect(spy).toHaveBeenCalled();
			done();
		});
	});
	it('changes sprite frames on movement', () => {
		const { frameindex, frametime } = monster.state;
		const rendererPromise = monster.render();

		rendererPromise.then(() => {
			const { lasttime, model } = monster.state;
			const xPos = model.position.x;

			monster.update();
			// Check for
			// 1. position
			expect(model.position.x).toNotBe(xPos);
			// 2. frame
			expect(monster.state.lasttime).toNotBe(lasttime);
			expect(monster.state.frameindex).toNotBe(frameindex);
			expect(monster.state.frametime).toNotBe(frametime);
		});
	});
});
