const webpack = require('webpack');
//const path = require('path');

module.exports = {
	debug: true,
	devtool: 'source-map',
	entry: [
		'./src/index.js',
	],
	externals: {
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
	],
	output: {
		paths: __dirname,
		filename: './src/bundle.js',
	},
	resolve: {
		root: __dirname,
		modulesDirectories: [
			'node_modules',
		],
		alias: {
			app: 'src',
		},
		extensions: ['', '.js'],
	},
	module: {
		loaders: [{
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-0'],
			},
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
		}],
	},
};
