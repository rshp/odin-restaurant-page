const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = 'development';
let buildPath = path.resolve(__dirname, 'dev-build');
let optimization = {};

const plugins = [
	new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
	new HtmlWebpackPlugin({
		template: './src/index.html',
	}),
];

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	buildPath = path.resolve(__dirname, 'dist');
	optimization = {
		minimizer: [new CssMinimizerPlugin(), '...'], //adds css minimizer to defaults
	};
}

module.exports = {
	mode: mode,
	entry: './src/index.js',
	plugins: plugins,
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: buildPath,
		assetModuleFilename: 'assets/[hash][ext][query]',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					mode == 'development' //inline style css in dev but separate css file in prod
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: { publicPath: '' },
						  },
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	optimization: optimization,
	devtool: mode == 'development' ? 'source-map' : false,
	devServer: {
		hot: true,
	},
};
