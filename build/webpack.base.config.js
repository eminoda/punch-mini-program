/**
 * webpack 基础公用配置
 *
 * 配置说明：https://webpack.js.org/configuration/
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, '../'),

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							sourceMap: false
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'img/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin({
		// 	// verbose: true,
		// 	dry: false
		// }),
		new MiniCssExtractPlugin({
			moduleFilename: data => {
				return `pages/[name]/[name].wxss`;
			},
			ignoreOrder: false // Enable to remove warnings about conflicting order
		}),
		new CopyWebpackPlugin([
			{
				from: 'app.*',
				to: '[name].[ext]',
				context: 'src/',
				toType: 'template'
			},
			{
				from: 'project.config.json',
				context: 'src/',
				toType: 'dir'
			},
			{ from: 'sitemap.json', context: 'src/', toType: 'dir' }
		]),
		new CopyWebpackPlugin([
			{
				from: 'src/pages/**/*.html',
				to: 'pages/[name]/[name].wxml',
				toType: 'template'
			}
		])
		// new HtmlWebpackPlugin({
		// 	title: 'webpack-server-middleware',
		// 	filename: `index.html`,
		// 	template: path.join(__dirname, '../public/index.template.html'),
		// 	inject: true
		// })
	]
};
