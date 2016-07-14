import PIXI from 'pixi.js';

import animationLoop from 'tools/animationLoop';
import { StageProps } from 'components/Stage';

export default class Renderer {
	constructor(Stage, view) {
		// Create PIXI renderer
		const renderer = PIXI.autoDetectRenderer(StageProps.width, StageProps.height, {
			view,
			antialias: false,
			transparent: true,
			resolution: 1,
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
