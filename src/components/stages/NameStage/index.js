import { Container, interaction } from 'pixi.js';

import Name from 'components/Name';

class NameStage {
	constructor(renderer) {
		const { InteractionManager } = interaction;

		this.props = {
			renderer,
			stage: new Container(),
			// FIXME:10 hardcoded Name
			name: new Name('Luciano Graziani', new InteractionManager(renderer)),
		};
	}

	render() {
		const { stage, name } = this.props;

		stage.addChild(name.render());

		return stage;
	}
}

NameStage.width = 300;
NameStage.height = 80;
NameStage.props = {
	backgroundColor: 0xFFFFFF,
	antialias: false,
	transparent: true,
	resolution: 1,
};

export default NameStage;
