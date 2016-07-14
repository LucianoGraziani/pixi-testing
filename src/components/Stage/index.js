import { Container } from 'pixi.js';

import Name from 'components/Name';

export const StageProps = {
	backgroundColor: 0xFFFFFF,
	width: 512,
	height: 512,
	boundaries: {
		x: 32,
		y: 15,
		width: 480,
		height: 480,
	},
};

export default class Stage {
	constructor() {
		this.state = {
			stage: new Container(),
			// FIXME hardcoded name
			name: new Name('Luciano Graziani'),
		};
	}

	render() {
		const { stage, name } = this.state;

		stage.addChild(name.render());

		return stage;
	}
}
