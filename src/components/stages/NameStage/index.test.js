import expect from 'expect';
import PIXI, { Container, Text } from 'pixi.js';

import Stage from 'components/stages/NameStage';

describe('<NameStage>', () => {
	let renderer;
	let stage;
	let renderedStage;

	beforeEach(() => {
		renderer = PIXI.autoDetectRenderer(Stage.width, Stage.height, {
			...Stage.props,
		});
		stage = new Stage(renderer);
		renderedStage = stage.render();
	});

	it('renders a PIXI Container', () => {
		expect(renderedStage).toBeA(Container);
	});

	it('is the root container', () => {
		expect(renderedStage.parent).toNotExist();
	});

	it('is visible', () => {
		expect(renderedStage.visible).toBe(true);
	});

	describe('Child: <Name>', () => {
		let children;

		beforeEach(() => {
			children = renderedStage.children;
		});

		it('has one child of type Text', () => {
			expect(children.length).toBe(1);
			expect(children[0]).toBeA(Text);
		});
	});
});
