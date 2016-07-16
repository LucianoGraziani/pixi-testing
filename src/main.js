import Renderer from 'components/Renderer';
import Stage from 'components/stages/NameStage';

// Get element from DOM
const view = document.getElementById('stage');

// Create PIXI renderer
const renderer = new Renderer(Stage, view);

renderer.render();
