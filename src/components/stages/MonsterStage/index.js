import { Container, loader } from 'pixi.js';

import PixiLoader from 'tools/PixiLoader';
import Monster from 'components/Monster';

class MonsterStage {
	constructor(renderer) {
		const pixiLoader = new PixiLoader(loader);

		this.props = {
			renderer,
			monster: new Monster(pixiLoader),
			stage: new Container(),
			pixiLoader,
		};
	}

	render() {
		const { stage, monster } = this.props;
		const asd = monster.render();

		console.log(monster.render);
		asd.then((model) => {
			stage.addChild(model);
		});

		return stage;
	}
}

MonsterStage.width = 800;
MonsterStage.height = 600;
MonsterStage.props = {
	antialiasing: false,
	transparent: false,
	resolution: window.devicePixelRatio,
	autoResize: true,
};

export default MonsterStage;
