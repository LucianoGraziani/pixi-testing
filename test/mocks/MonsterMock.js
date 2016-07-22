import { Container } from 'pixi.js';

export default class MonsterMock {
	constructor(pixiLoader) {
		this.props = {
			pixiLoader,
		};
		this.render = this.render.bind(this);
	}
	render() {
		return new Promise((resolve) => {
			resolve(new Container());
		});
	}
}
