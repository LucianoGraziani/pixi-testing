import { Container, interaction } from 'pixi.js';

import Name from 'components/Name';

class NameStage {
	constructor(renderer) {
		const { InteractionManager } = interaction;

		this.props = {
			renderer,
			stage: new Container(),
			// FIXME hardcoded Name
			name: new Name('Luciano Graziani', new InteractionManager(renderer)),
		};
	}

	render() {
		const { stage, name } = this.props;

		stage.addChild(name.render());

		return stage;
	}
}

NameStage.props = {
	backgroundColor: 0xFFFFFF,
	width: 300,
	height: 80,
};

export default NameStage;
