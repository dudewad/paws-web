const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var commonConfig = require('./webpack-common');

/**
 * Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.metadata, {
	ENV: ENV
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
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
				test: /\.scss$/,
				data: `$env: ${ENV};`,
				loader: 'raw-loader!postcss-loader!sass-loader'
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
		path: helpers.root('dev/'),
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
		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV),
			'VERSION': JSON.stringify(METADATA.version + '-dev'),
			'VERSION_DTM': JSON.stringify(METADATA.versionDtm),
			'process.env': {
				'ENV': JSON.stringify(METADATA.ENV),
				'NODE_ENV': JSON.stringify(METADATA.ENV)
			}
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
});
