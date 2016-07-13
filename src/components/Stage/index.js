import { Container } from 'pixi.js';

export const StageProps = {
	backgroundColor: 0x000000,
	width: 512,
	height: 512,
	boundaries: {
		x: 32,
		y: 15,
		width: 480,
		height: 480,
	},
};

export default class Stage {
	constructor() {
		this.state = {
			stage: new Container(),
		};
	}

	render() {
		const { stage } = this.state;
		return stage;
	}
}
