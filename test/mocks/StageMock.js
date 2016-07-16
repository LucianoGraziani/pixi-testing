import expect from 'expect';
import { Container } from 'pixi.js';

class StageMock {
	constructor(renderer) {
		this.props = {
			renderer,
			container: new Container(),
		};
	}
	render() {
		return this.props.container;
	}
	willUnmount() {
		const spy = expect.createSpy();

		spy();
		expect(spy).toHaveBeenCalled();
	}
}
StageMock.props = {
	width: 300,
	heigth: 80,
};

export default StageMock;
