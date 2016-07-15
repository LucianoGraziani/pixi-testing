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

		content.on('mouseover', this.handleMouseOver);
		content.interactive = true;

		return content;
	}
}

function changeColor(content) {
	content.scale.x += 0.3;
	content.scale.y += 0.3;
	content.style.fill = 'red';
}
