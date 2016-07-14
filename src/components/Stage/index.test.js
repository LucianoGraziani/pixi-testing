import expect from 'expect';
import { Container, Text } from 'pixi.js';

import Stage from 'components/Stage';

describe('<Stage>', () => {
	const stage = new Stage();
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
