const webpackConfig = require('../webpack.config.js');

module.exports = (config) => {
	config.set({
		browsers: ['Chrome'],
		frameworks: ['mocha'],
		singleRun: true,
		files: [{
			pattern: './test-bundler.js',
			watched: false,
			served: true,
			included: true,
		}],
		preprocessors: {
			['./test-bundler.js']: ['sourcemap', 'webpack'],
		},
		reporters: ['mocha'],
		client: {
			mocha: {
				timeout: '5000',
			},
		},
		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only',
		},
		webpack: webpackConfig,
		webpackServer: {
			noInfo: true,
		},
	});
};
