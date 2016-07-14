import { Text } from 'pixi.js';

export default class Name {
	constructor(name) {
		this.state = {
			content: new Text(name),
		};
	}
	render() {
		const { content } = this.state;

		return content;
	}
}
