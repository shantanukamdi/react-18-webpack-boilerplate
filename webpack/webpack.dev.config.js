const path = require("path");
const { merge } = require("webpack-merge");
const Webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");
const common = require("./webpack.common.config");

const plugins = [];

if (process.env.analyze) {
	plugins.push(
		new BundleAnalyzerPlugin({
			openAnalyzer: true,
			reportFilename: "bundleReport.html",
			analyzerMode: "static",
		})
	);
}

module.exports = merge(common, {
	devtool: process.env.NODE_ENV === "development" ? "inline-source-map" : false,
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		port: 3000,
		hot: true,
	},
	plugins,
});
