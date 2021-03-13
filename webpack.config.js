const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const environmentPlugin =
	process.env.NODE_ENV === "production"
		? new webpack.EnvironmentPlugin({ ...process.env })
		: new Dotenv();

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve("dist"),
		filename: "bundle.js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
			{ test: /\.css$/, loader: ["style-loader", "css-loader"] },
			{
				test: /\.s(a|c)ss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("node-sass"),
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "./images/[name].[ext]",
					},
				},
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "./fonts/[name].[ext]",
					},
				},
			},
		],
	},
	devServer: {
		hot: true,
		inline: true,
		port: 8000,
		open: true,
		contentBase: "src",
		watchContentBase: true,
		proxy: {
			"/api": "http://localhost:4000",
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		environmentPlugin,
		new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),
		new HtmlWebpackPlugin({
			template: "src/index.html",
			filename: "index.html",
			inject: "body",
		}),
	],
};
