/**
 * It has to be an abstract factory?
 * Something that would save the instances of
 * his resources, so it can be shared across the app.
 */
export default class PixiLoader {
	constructor(loader) {
		this.props = {
			loader,
			resources: new Map(),
		};
	}
	load(resource) {
		const { resources } = this.props;

		if (resources.has(resource)) {
			return resources.get(resource);
		}
		const { loader } = this.props;
		const promise = new Promise((resolve, reject) => {
			loader.add(resource).load(() => resolve(loader.resources[resource]));
			loader.on('error', (err) => {
				reject(err);
				throw new ReferenceError(err);
			});
		});

		resources.set(resource, promise);

		return promise;
	}
}
