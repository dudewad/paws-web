var path = require('path');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var commonConfig = require('./webpack-common');
var pkg = require(helpers.root() + '/package.json');

/**
 * Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = webpackMerge(commonConfig.METADATA, {
	ENV: ENV,
	CONTENT_ROOT: pkg.url.staging.contentRoot,
	DATA_ROOT: pkg.url.dev.dataRoot
});

const outputBase = 'dist/staging';
const paths = {
	output: {
		content: helpers.root(path.join(outputBase, 'assets')),
		site: helpers.root(path.join(outputBase, 'site')),
		siteData: helpers.root(path.join(outputBase, 'site', 'site-data'))
	}
};

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
				data: `
					$env: ${ENV}; 
					$urlContentRoot: ${pkg.url.contentRootStaging};
					$urlFontRelativePath: ${pkg.url.fontRelativePath};
				`,
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
		path: paths.output.site,
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'app/assets',
				to: paths.output.content
			},
			{
				from: 'app/site-data',
				to: paths.output.siteData
			}
		]),

		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV),
			'VERSION': JSON.stringify(METADATA.version),
			'VERSION_DTM': JSON.stringify(METADATA.versionDtm),
			'CONTENT_ROOT': JSON.stringify(METADATA.CONTENT_ROOT),
			'DATA_ROOT': JSON.stringify(METADATA.DATA_ROOT),
			'FONT_RELATIVE_PATH': JSON.stringify(METADATA.FONT_RELATIVE_PATH),
			'IMAGE_RELATIVE_PATH': JSON.stringify(METADATA.IMAGE_RELATIVE_PATH),
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
				screw_ie8: true,
				warnings: false
			},
			comments: false,
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
		emitErrors: true,
		failOnHint: true,
		resourcePath: 'app'
	}
});
