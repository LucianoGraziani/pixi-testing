export default class LoaderMock {
	constructor(success, err, message) {
		this.props = {
			success,
			err,
			message,
		};
		this.resources = {};
	}
	add(resource) {
		const self = this;
		const { success, err, message } = this.props;

		return {
			load(callback) {
				if (resource.includes(err)) {
					self.error(message);

					return;
				}
				self.resources[success] = true,
				callback();
			},
		};
	}
	on(err, callback) {
		this.error = callback;
	}
}
