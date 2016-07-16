import expect from 'expect';
import PIXI, { Container, Text } from 'pixi.js';

import Stage from 'components/stages/NameStage';

describe('<NameStage>', () => {
	const renderer = PIXI.autoDetectRenderer(Stage.props.width, Stage.props.height, {
		antialias: false,
		transparent: true,
		resolution: 1,
	});
	const stage = new Stage(renderer);
	const renderedStage = stage.render();

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
		const { children } = renderedStage;

		it('has one child of type Text', () => {
			expect(children.length).toBe(1);
			expect(children[0]).toBeA(Text);
		});
	});
});
