import { Text } from 'pixi.js';

export default class Name {
	constructor(name, interactionManager) {
		this.props = {
			content: new Text(name),
			interactionManager,
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
	}
	handleMouseOver(event) {
		const { content, interactionManager } = this.props;

		interactionManager.processInteractive(event.data.global, content, changeColor, true);
	}
	render() {
		const { content } = this.props;

		content.on('mousemove', this.handleMouseOver);

		return content;
	}
}

function changeColor(content, hit) {
	content.style.color = hit ? 'red' : 'black';
}
