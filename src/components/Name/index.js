import { Graphics, Text, Texture, tween as PixiTween, tweenManager } from 'pixi.js';
import 'pixi-tween'; //Injects tween into PIXI namespace
import { Emitter } from 'pixi-particles';

import particlesImgUrl from 'images/particle.png';
import particlesData from 'data/particle.json';
import { EventColl } from 'tools/animationLoop';
import { StageProps } from 'components/Stage';

export default class Name {
	constructor(name, interactionManager) {
		const content = new Text(name);
		const pivot = new Graphics();

		pivot.drawRect(0, 0, 0, 0);
		content.addChild(pivot);

		const emitter = new Emitter(pivot, [Texture.fromImage(particlesImgUrl)], particlesData);

		content.position.x = (StageProps.width / 2) - content.width / 2;
		content.position.y = 0;

		pivot.position.x = 2;
		pivot.position.y = content.height - 5;

		this.props = {
			content,
			interactionManager,
			emitter,
			tween: createTween(pivot, content),
		};
		this.startParticleEmitter = this.startParticleEmitter.bind(this);
	}
	startParticleEmitter() {
		const { content, interactionManager, emitter, tween } = this.props;
		let elapsed = Date.now();

		function update() {
			const now = Date.now();
			const { mouse } = interactionManager;

			interactionManager.processInteractive(mouse.global, content, changeColor(tween), true);
			tweenManager.update();
			emitter.update((now - elapsed) * 0.001);

			elapsed = now;
		}

		return update;
	}
	render() {
		const { content } = this.props;

		EventColl.add(this.startParticleEmitter());
		content.interactive = true;

		return content;
	}
}

function createTween(pivot, content) {
	// Create a custom path
	const path = new PixiTween.TweenPath();
	const tween = tweenManager.createTween(pivot);

	path.moveTo(0, pivot.position.y).lineTo(content.width, pivot.position.y);
	path.closed = false;
	tween.path = path;
	tween.time = 5000;
	tween.pingPong = true;
	tween.loop = true;

	return tween;
}

function changeColor(tween) {
	return (content, hit) => {
		content.style.fill = 'red';

		if (hit) tween.start();
		else tween.stop();
	};
}
