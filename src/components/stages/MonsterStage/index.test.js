import expect from 'expect';
import PIXI from 'pixi.js';

import PixiLoader from 'tools/PixiLoader';
import MonsterMock from 'mocks/MonsterMock';
//eslint-disable-next-line import/no-unresolved
import monterStageInjector from 'inject?components/Monster!components/stages/MonsterStage';

const Stage = monterStageInjector({
	'components/Monster': MonsterMock,
}).default;

describe('<MonsterStage>', () => {
	let renderer;
	let monsterStage;

	beforeEach(() => {
		// FIXME:20 add mock
		renderer = PIXI.autoDetectRenderer(Stage.width, Stage.height, {
			...Stage.props,
		});
		monsterStage = new Stage(renderer);
	});

	it('has a PixiLoader instance', () => {
		expect(monsterStage.props.pixiLoader).toBeA(PixiLoader);
	});

	describe('Child: <Monster>', () => {
		it('has one instance', () => {
			// It's OK to check against the Mock Class
			expect(monsterStage.props.monster).toBeA(MonsterMock);
		});
		it('renders monster instance', (done) => {
			monsterStage.render();
			setTimeout(() => {
				const { children } = monsterStage.props.stage;

				expect(children.length).toBe(1);
				done();
			}, 1);
		});
		it.skip('renders background instance');
		it.skip('renders foreground instance');
	});
});
