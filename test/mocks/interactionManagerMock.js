export default {
	processInteractive(point, sprite, callback, hitTest) {
		callback(sprite, hitTest);
	},
	mouse: {
		global: [1, 1],
	},
};
