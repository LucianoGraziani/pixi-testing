import shortid from 'shortid';

/**
 * Función controladora del loop de animación. Solo puede haber
 * una función activa, esto significa que si se instancian dos
 * veces la misma función, en distintos lados, la última es la
 * única que funcionará.
 *
 * @param {PIXI.renderer}     renderer renderizador de pixi
 * @param {PIXI.stage}          stage
 * @param {Function} callback   función que realiza alguna acción
 *                              en el stage.
 *
 */

const events = new Map();

export const EventColl = Object.freeze({
	/**
	 * Add a PIXI event function
	 * @param  {function}  event   add the function into the events collection
	 * @return {string}    id
	 */
	add(event) {
		if (typeof event !== 'function') {
			throw new TypeError('`event` must be a function');
		}
		const id = shortid.generate();

		events.set(id, event);

		return id;
	},
	/**
	 * Removes a PIXI event function
	 * @param  {string} id
	 * @return {void}
	 */
	remove(id) {
		if (!events.has(id)) {
			throw new ReferenceError(`id of ${id} doesn't exist`);
		}
		events.delete(id);
	},
});

let animationId;

export default Object.freeze({
	startLoop(renderer, stage) {
		if (typeof animationId !== 'undefined') {
			throw new ReferenceError('animationLoop is already started');
		}
		(function loop() {
			// Update game state
			events.forEach(event => event());

			//Render the stage
			renderer.render(stage);

			// Loop this function 60 times per second
			animationId = requestAnimationFrame(loop);
		})();
	},
	stopLoop() {
		if (typeof animationId === 'undefined') {
			throw new ReferenceError('animationLoop hasn`t been started');
		}
		cancelAnimationFrame(animationId);
		animationId = undefined;
	},
});
