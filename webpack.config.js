const webpack = require('webpack');
const path = require('path');

const modules = ['node_modules', 'src', 'test'];

module.exports = {
	debug: true,
	devtool: 'inline-eval-source-map',
	entry: [
		'./src/main.js',
	],
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
	],
	output: {
		paths: path.resolve(__dirname, 'public'),
		publicPath: '/assets/',
		filename: 'bundle.js',
	},
	resolve: {
		root: __dirname,
		modulesDirectory: modules,
		modules,
		extensions: ['', '.js'],
	},
	module: {
		loaders: [{
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0'],
			},
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
		}],
	},
};
