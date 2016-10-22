const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.js');
const helpers = require('./helpers');
const HOST = '0.0.0.0';
const PORT = 3000;
config.entry.app.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}/`, `webpack/hot/dev-server`);


/**
 * Webpack Development Server configuration
 * Description: The webpack-dev-server is a little node.js Express server.
 * The server emits information about the compilation state to the client,
 * which reacts to those events.
 *
 * See: https://webpack.github.io/docs/webpack-dev-server.html
 */
const webpackDevServerOptions = {
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    stats: {
        colors: true,
        errorDetails: true,
        cached: true,
        chunks: false
    },
    contentBase: helpers.root(''),
    outputPath: helpers.root('prod')
};

var app = new WebpackDevServer(webpack(config), webpackDevServerOptions);

app.listen(PORT, HOST, function (err) {
    if (err) {
        throw err;
    }

    console.info(`Listening at http://${HOST}:${PORT}`);
});
