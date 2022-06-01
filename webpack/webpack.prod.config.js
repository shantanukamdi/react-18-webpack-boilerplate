const path = require("path");
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const common = require("./webpack.common.config");

const plugins = [
	new CompressionPlugin({
		algorithm: "gzip",
		filename: "[path].gz[query]",
		test: /\.(js|jsx)$|\.css|.html$/,
	}),
];

module.exports = merge(common, {
	plugins,
});
