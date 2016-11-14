const helpers = require('./helpers');
var webpack = require('webpack');
var pkg = require(helpers.root() + '/package.json');

/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Constants
 */
const METADATA = {
	FONT_RELATIVE_PATH: pkg.url.relative.font,
	IMAGE_RELATIVE_PATH: pkg.url.relative.image
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
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			chunksSortMode: 'dependency',
			filename: 'index.html',
			template: 'index.html'
		})
	],
	postcss: function () {
		return [];
	},
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
