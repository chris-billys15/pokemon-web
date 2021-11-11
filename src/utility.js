import React from "react";
import { toast } from "react-toastify";

const toPascalCase = (s) => {
	if (s) {
		s = s.replace("-", " ");
		return s.replace(/\w+/g, function (w) {
			return w[0].toUpperCase() + w.slice(1).toLowerCase();
		});
	}
	return s;
};
const pad = (num, size) => {
	if (num) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		num = "#" + num;
	}
	return num;
};

const notify = (str) =>
	toast.warn(str, {
		icon: ({ theme, type }) => (
			<img width="20px" src={process.env.PUBLIC_URL + "/pokeball.png"} />
		),
	});

const isImageExist = (url) => {
	// var http = new XMLHttpRequest();
	// http.open("HEAD", url, false);
	// http.send();
	// return http.status != 404;
	var img = new Image();
	img.src = url;
	return img.height != 0;
};
export { toPascalCase, pad, notify, isImageExist };
