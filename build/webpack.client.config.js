/**
 * webpack 客户端配置
 *
 * 配置说明：https://webpack.js.org/configuration/
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helper = require('./helper');
module.exports = merge(webpackBaseConfig, {
	//   entry: {
	//     app: "./src/entry-client.js"
	//   },
	entry: helper.entry,
	externals: {
		axios: 'axios'
	},
	devtool: 'none',
	output: {
		path: path.resolve(__dirname, '../dist'), // The output directory as **absolute path** (required)
		publicPath: '',
		filename: 'pages/[name]/[name].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/asserts',
				to: 'assets',
				toType: 'dir',
				ignore: ['.DS_Store']
			}
		])
	],
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		compress: false,
		port: 3000,
		hot: true
	}
});
