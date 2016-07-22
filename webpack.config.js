const webpack = require('webpack');
const path = require('path');

const modules = ['node_modules', 'src', 'test', 'assets'];

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
		loaders: [
			{
				loader: 'babel',
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
			}, {
				test: /\.(jpe?g|png|gif)$/i,
				loaders: ['file?name=[path][name].[ext]'],
			},
			// pixi uses fs.readFileSync require()s json files and need to transform his version
			{
				test: /\.js$/,
				loaders: ['transform?brfs'],
				include: /node_modules/,
			}, {
				include: path.resolve(__dirname, 'node_modules/pixi.js'),
				loader: 'transform/cacheable?browserify-versionify',
			},
		],
	},
};
