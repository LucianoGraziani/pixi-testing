import { Container, interaction } from 'pixi.js';

import Name from 'components/Name';

export const StageProps = {
	backgroundColor: 0xFFFFFF,
	width: 300,
	height: 80,
	boundaries: {
		x: 32,
		y: 15,
		width: 480,
		height: 480,
	},
};

export default class Stage {
	constructor(renderer) {
		const { InteractionManager } = interaction;

		this.props = {
			renderer,
			stage: new Container(),
			// FIXME hardcoded name
			name: new Name('Luciano Graziani', new InteractionManager(renderer)),
		};
	}

	render() {
		const { stage, name } = this.props;

		stage.addChild(name.render());

		return stage;
	}
}
