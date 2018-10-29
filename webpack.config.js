const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = new require("html-webpack-plugin");
const createElectronReloadWebpackPlugin = require("electron-reload-webpack-plugin");

module.exports = (env, argv) => {
	let config = {
		entry: path.join(__dirname, "view/js/renderer.js"),
		target: "electron-renderer",
		mode: "development",
		devtool: "source-map",
		optimization: {
			minimize: false
		},
		module: {
			rules: [
				/*{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["env", "react"]
						}
					}
				},*/
				{
					test: /\.(scss|css)$/,
					use: ["style-loader", "css-loader", "sass-loader"]
				}
			]
		},
		plugins: [
			//new webpack.HotModuleReplacementPlugin(),
			new htmlWebpackPlugin({
				template: path.join(__dirname, "view/html/index.html"),
				filename: "./index.html"
			}),
			createElectronReloadWebpackPlugin({
				// Path to `package.json` file with main field set to main process file path, or just main process file path
				path: path.join(__dirname, "./main/main.js"),
				// or just `path: './'`,
				// Other 'electron-connect' options
				logLevel: 0
			})("electron-renderer")
		],
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	};

	/*function isProduction() {
		return argv.mode === "production";
	}

	if (!isProduction()) {
		config.devtool = "source-map";
	}
	else if (isProduction()) {
	}*/

	return config;
};
