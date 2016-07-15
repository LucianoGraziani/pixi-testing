import expect from 'expect';
import { Text } from 'pixi.js';

import Name from 'components/Name';

describe('<Name>', () => {
	const interactionManagerMock = {
		processInteractive(point, sprite, callback, hitTest) {
			callback(sprite, hitTest);
		},
		mouse: {
			global: [1, 1],
		},
	};
	const name = new Name('Luciano Graziani', interactionManagerMock);
	const renderedName = name.render();

	it('renders a PIXI Text', () => {
		expect(renderedName).toBeA(Text);
	});

	it('is visible', () => {
		expect(renderedName.visible).toBe(true);
	});

	it('has only one child', () => {
		const { children } = renderedName;

		expect(children.length).toBe(1);
	});

	it('has a text', () => {
		const { text } = renderedName;

		expect(text).toNotBe(' ');
	});

	describe('Event: mouseOver', () => {
		it('changes his style when execute handleMouseOver', () => {
			name.startParticleEmitter()();

			expect(renderedName.style.fill).toBe('red');
		});
	});
});
