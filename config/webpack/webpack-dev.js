const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var commonConfig = require('./webpack-common');
var pkg = require(helpers.root() + '/package.json');

/**
 * Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.METADATA, {
	ENV: ENV,
	CONTENT_ROOT: pkg.url.dev.contentRoot,
	DATA_ROOT: pkg.url.dev.dataRoot
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
			'CONTENT_ROOT': JSON.stringify(METADATA.CONTENT_ROOT),
			'DATA_ROOT': JSON.stringify(METADATA.DATA_ROOT),
			'FONT_RELATIVE_PATH': JSON.stringify(METADATA.FONT_RELATIVE_PATH),
			'IMAGE_RELATIVE_PATH': JSON.stringify(METADATA.IMAGE_RELATIVE_PATH),
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
	sassLoader: {
		data: '$env: "' + ENV + '";'
			+ '$urlContentRoot: "' + METADATA.CONTENT_ROOT + '";'
			+ '$urlFontRelativePath: "' + METADATA.FONT_RELATIVE_PATH + '";'
			+ '$urlImageRelativePath: "' + METADATA.IMAGE_RELATIVE_PATH + '";'
	},
	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'app'
	}
});
