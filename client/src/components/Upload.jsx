import React, { useState } from "react";

const Upload = () => {
	const [fileInputState, setFileInputState] = useState("");
	const [selectedFile, setSelectedFile] = useState("");
	const [previewSource, setPreviewSource] = useState("");

	const previewAvatar = (img) => {
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewAvatar(file);
	};

	const uploadAvatar = async (base64EncodedImg) => {
		console.log(base64EncodedImg);
		try {
			await fetch("http://localhost:8080/auth/auth_taskee");
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleSubmitAvatar = (e) => {
		e.preventDefault();
		console.log(`submit`);

		if (!previewSource) return;
		uploadAvatar(previewSource);
	};

	return (
		<div>
			<form
				action=""
				onSubmit={handleSubmitAvatar}>
				<input
					type="file"
					name=""
					id=""
					onChange={handleFileInputChange}
					value={fileInputState}
				/>
				<button type="submit">Submit</button>
			</form>
			{previewSource && (
				<img
					src={previewSource}
					style={{ height: "300px" }}
				/>
			)}
		</div>
	);
};

export default Upload;
