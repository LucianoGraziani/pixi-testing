import PIXI from 'pixi.js';

import animationLoop from 'tools/animationLoop';

export default class Renderer {
	constructor(Stage, view) {
		// Create PIXI renderer
		const renderer = PIXI.autoDetectRenderer(Stage.width, Stage.height, {
			view,
			...Stage.props,
		});

		// Renderer configuration
		renderer.autoResize = true;

		this.props = {
			renderer,
			stage: new Stage(renderer),
		};
	}
	render() {
		const { renderer, stage } = this.props;
		const renderedStage = stage.render();

		animationLoop.startLoop(renderer, renderedStage);
	}
	willUnmount() {
		const { stage } = this.props;

		animationLoop.stopLoop();
		stage.willUnmount();
	}
}
