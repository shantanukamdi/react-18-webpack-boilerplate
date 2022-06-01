import React from "react";
import ReactDom from "react-dom";

import { Button } from "antd";

import "antd/dist/antd.less";
import "./main.less";

ReactDom.render(
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh",
			flexDirection: "column",
		}}
	>
		<h2>React Webpack Antd Boilerplate</h2>
		<Button type="primary">Welcome</Button>
	</div>,
	document.getElementById("root")
);
