const helpers = require('./helpers');
var webpack = require('webpack');

/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = {
	title: 'Paws for a Beer',
	baseUrl: '/',
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
	debug: true,
	devServer: {inline: true},
	entry: {
		'app': ['./app/main.browser.ts']
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
				test: /\.scss$/,
				loader: 'raw-loader!postcss-loader!sass-loader',
				/*exclude: [
					helpers.root('app/app.scss')
				]*/
			},
			/*{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('raw-loader!postcss-loader!sass-loader'),
				include: [
					helpers.root('app/app.scss')
				]
			},*/
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
		})
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
