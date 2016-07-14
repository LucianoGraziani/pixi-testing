import PIXI from 'pixi.js';

import Stage, { StageProps } from 'components/Stage';

// Get element from DOM
const view = document.getElementById('stage');

// Create PIXI renderer
const renderer = PIXI.autoDetectRenderer(StageProps.width, StageProps.height, {
	view,
	antialias: false,
	transparent: true,
	resolution: 1,
});

// Renderer configuration
renderer.autoResize = true;

const stage = new Stage();

renderer.render(stage.render());
