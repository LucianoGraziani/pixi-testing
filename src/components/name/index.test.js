import expect from 'expect';
import { Text } from 'pixi.js';

import Name from 'components/Name';

describe('<Name>', () => {
	const name = new Name('Luciano Graziani');
	const renderedName = name.render();

	it('renders a PIXI Text', () => {
		expect(renderedName).toBeA(Text);
	});

	it('is visible', () => {
		expect(renderedName.visible).toBe(true);
	});

	it('has no children', () => {
		const { children } = renderedName;

		expect(children.length).toBe(0);
	});

	it('has a text', () => {
		const { text } = renderedName;

		expect(text).toNotBe(' ');
	});

	describe('Event: mouseOver', () => {
		const mockEvent = {
			preventDefault() {},
		};

		it('changes his style when execute handleMouseOver'/*, () => {
			name.handleMouseOver(mockEvent);

			expect(renderedName.style.color).toBe('red');
		}*/);
	});
});
