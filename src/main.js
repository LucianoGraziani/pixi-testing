import Renderer from 'components/Renderer';
import Stage from 'components/Stage';

// Get element from DOM
const view = document.getElementById('stage');

// Create PIXI renderer
const renderComponent = new Renderer(Stage, view);

renderComponent.render();
