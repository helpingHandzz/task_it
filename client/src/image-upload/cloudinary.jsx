import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = () => {
	// Create a Cloudinary instance and set your cloud name.
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dqxmvnqxm",
		},
	});
};

export default cloudinary;
