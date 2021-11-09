import React from "react";

const toPascalCase = (s) => {
	if (s) {
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

export { toPascalCase, pad };
