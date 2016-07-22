import expect from 'expect';
import { Text } from 'pixi.js';

import Name from 'components/Name';
import interactionManagerMock from 'mocks/interactionManagerMock';

describe('<Name>', () => {
	let name;
	let renderedName;

	beforeEach(() => {
		name = new Name('Luciano Graziani', interactionManagerMock);
		renderedName = name.render();
	});

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
