const webpack = require("webpack");
const path = require("path");

const config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: {
			directory: "./dist",
		},
	},
};

module.exports = config;
