const webpackConfig = require('./webpack.config.js');

module.exports = (config) => {
	config.set({
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha'],
		files: [
			'src/**/*.test.js',
		],
		preprocessors: {
			'src/**/*.js': ['sourcemap', 'webpack'],
		},
		reporters: ['mocha'],
		client: {
			mocha: {
				timeout: '5000',
			},
		},
		webpack: webpackConfig,
		webpackServer: {
			noInfo: true,
		},
	});
};
