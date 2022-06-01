const path = require("path");
const ExtractCssPlugin = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const env = process.env.NODE_ENV;

const plugins = [
	new CleanWebpackPlugin(),
	new ExtractCssPlugin({
		filename: env === "development" ? "[name].css" : "[name].[hash].css",
		chunkFilename: "css/[name].[hash].css",
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "../public/index.html"),
	}),
];

module.exports = {
	entry: {
		app: path.resolve(__dirname, "/src/index.jsx"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "less-loader",
						options: {
							lessOptions: {
								modifyVars: {
									"primary-color": "#244CF0",
									"link-color": "#244CF0",
									"border-radius-base": "2px",
								},
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [ExtractCssPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png | jpe?g | gif | webp | svg)$/i,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					outputPath: "assets/images",
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	mode: env,
	plugins,
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks: "all",
			minChunks: 1,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
				},
			},
		},
		moduleIds: "deterministic",
		runtimeChunk: "single",
	},
	output: {
		filename: env === "development" ? "[name].js" : "[name].[hash].js",
		path: path.resolve(__dirname, "../dist"),
		chunkFilename: "scripts/[name].[hash].js",
	},
};
