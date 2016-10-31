const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var commonConfig = require('./webpack-common');

/**
 * Plugins
 */
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = webpackMerge(commonConfig.metadata, {
	ENV: ENV
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
	debug: false,
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
		path: helpers.root('dist/'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV),
			'VERSION': JSON.stringify(METADATA.version),
			'VERSION_DTM': JSON.stringify(METADATA.versionDtm),
			'process.env': {
				'ENV': JSON.stringify(METADATA.ENV),
				'NODE_ENV': JSON.stringify(METADATA.ENV)
			}
		}),

		new UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
	],
	resolve: {
		extensions: ['', '.ts', '.js'],
		root: helpers.root(),
		modulesDirectories: ['node_modules'],
		alias: {}
	},
	tslint: {
		emitErrors: true,
		failOnHint: true,
		resourcePath: 'app'
	}
});
