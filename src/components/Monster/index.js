import { Sprite } from 'pixi.js';

// eslint-disable-next-line import/no-unresolved
import monsterURL from 'file?name=[path][name].[ext]!images/monster.json';
import 'images/monster.png';
// eslint-disable-next-line import/no-unresolved
import monsterHighURL from 'file?name=[path][name].[ext]!images/monster-high.json';
import 'images/monster-high.png';

import NameStage from 'components/stages/NameStage';

export default class Monster {
	constructor(pixiLoader) {
		this.state = {
			frameindex: 0,
			frametime: 0.08,
		};
		this.props = {
			pixiLoader,
			frames: [
				'frame-1.png',
				'frame-2.png',
				'frame-3.png',
				'frame-4.png',
			],
			framerate: 0.08,
			velocity: 100,
		};
		this.render = this.render.bind(this);
		this.update = this.update.bind(this);
		this.setState = this.setState.bind(this);
	}
	setState(state) {
		this.state = {
			...this.state,
			...state,
		};
	}
	render() {
		const { pixiLoader, frames } = this.props;

		const spritesPromise = window.devicePixelRatio >= 2
			? pixiLoader.load(monsterHighURL)
			: pixiLoader.load(monsterURL);

		return spritesPromise.then((resource) => {
			const model = new Sprite(resource[frames[0]]);

			this.setState({
				lasttime : new Date().getTime(),
				model,
			});

			return model;
		});
	}
	update() {
		const { pixiLoader, frames, framerate, velocity } = this.props;
		const spritesPromise = window.devicePixelRatio >= 2
			? pixiLoader.load(monsterHighURL)
			: pixiLoader.load(monsterURL);
		let { frametime, frameindex, lasttime } = this.state;
		const { model } = this.state;

		spritesPromise.then((resource) => {
			const currtime = new Date().getTime;
			const delta = (currtime - lasttime) / 1000;

			// Move the monster
			model.position.x += velocity * delta;
			if (model.position.x > NameStage.width + model.width / 2) {
				model.position.x = -model.width / 2;
			}
			// Animate the monster
			lasttime = currtime;
			frametime -= delta;
			if (frametime <= 0) {
				frameindex++;
				if (frameindex >= frames.length) {
					frameindex = 0;
				}
				model.texture = resource(frames[frameindex]);
				frametime = framerate;
			}
			this.setState({ frametime, lasttime, frameindex });
		});
	}
}
