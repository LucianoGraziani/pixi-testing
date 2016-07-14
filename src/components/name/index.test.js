// import util from 'util';
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

		// console.log(util.inspect(renderedName, {
		// 	showHidden: false,
		// 	depth: null,
		// 	colors: true,
		// }));
		expect(text).toNotBe(' ');
	});
});
