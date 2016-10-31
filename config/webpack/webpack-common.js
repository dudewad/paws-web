const helpers = require('./helpers');
var webpack = require('webpack');

/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Webpack Constants
 */
const METADATA = {};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
	debug: true,
	devServer: {inline: true},
	entry: {
		'vendor': ['./app/vendor.ts'],
		'app': ['./app/polyfills.ts', './app/main.browser.ts']
	},
	inline:true,
	METADATA,
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'raw-loader',
				exclude: [helpers.root('index.html')]
			},
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader']
			}
		]
	},
	node: {
		global: 'window',
		crypto: 'empty',
		process: true,
		module: false,
		clearImmediate: false,
		setImmediate: false
	},
	output: {
		path: helpers.root('prod/'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			chunksSortMode: 'dependency',
			filename: 'index.html',
			template: 'index.html'
		}),
		new CopyWebpackPlugin([
			{
				from: 'app/content',
				to: 'content'
			},
			{
				from: 'app/site-data',
				to: 'site-data'
			}
		])
	],
	resolve: {
		extensions: ['', '.ts', '.js'],
		root: helpers.root(),
		modulesDirectories: ['node_modules'],
		alias: {}
	},
	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'app'
	}
};
