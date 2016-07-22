export default class LoaderMock {
	constructor(err, message, spy = null) {
		this.props = {
			err,
			message,
			spy,
		};
		this.resources = {};
	}
	add(resource) {
		const self = this;
		const { err, message, spy } = this.props;

		return {
			load(callback) {
				if (resource.includes(err)) {
					self.error(message);

					return;
				}
				if (spy !== null) spy();
				self.resources[resource] = true;
				callback();
			},
		};
	}
	on(err, callback) {
		this.error = callback;
	}
}
