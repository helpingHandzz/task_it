const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
const path = require("path");

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};
/*
 * Create a multer instance that accepts an options object
 */
const storageAvatars = multer.diskStorage({
	destination: (req, file, callback) => {
		let destPath = path.join(
			__dirname,
			"../",
			"./uploads/"
		);
		callback(null, destPath);
	},

	filename: (req, file, callback) => {
		const extension = MIME_TYPE_MAP[file?.mimetype];
		console.log(`file: `, file);
		callback(null, uuidv4() + "." + extension);
	},

	fileFilter: (req, file, callback) => {
		const isValidImage = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValidImage
			? null
			: new Error("Invalid mimetype!");
		callback(error, isValidImage);
	},
});

const fileUploadAvatars = multer({
	storage: storageAvatars,
});

module.exports = fileUploadAvatars;
