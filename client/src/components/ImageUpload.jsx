import React, { useEffect, useState, useRef } from "react";

const ImageUpload = () => {
	const cloudinaryRef = useRef();
	const widgetRef = useRef();

	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current =
			cloudinaryRef.current.createUploadWidget(
				{
					cloudName: "dqxmvnqxm",
					uploadPreset: "mundane",
				},
				(err, result) => {
					console.log(`result: `, result);
				}
			);
		console.log(`cloudinary: `, cloudinaryRef.current);
	}, []);

	return (
		<div>
			<button
				className="btn"
				onClick={() => widgetRef.current.open()}>
				Upload an Avatar
			</button>
		</div>
	);
};

export default ImageUpload;
