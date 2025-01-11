import { Modal } from "antd";
import React, { useState } from "react";

type Props = {
	open: boolean;
	onCancel: () => void;
};

const AddModal = ({ open, onCancel }: Props) => {
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("✅");
		onCancel();
	};
	return (
		<Modal
			title="افزودن FAQ"
			centered
			open={open}
			onCancel={onCancel}
			width={"40%"}
			onOk={handleSubmit}
			cancelText={<span>انصراف </span>}
			okText={<span> تایید </span>}
		>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-between items-start pt-10"
				action=""
			>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="category"> دسته بندی : </label>
					<input
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						type="text"
						name="category"
						id="category"
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="question"> سوال : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="question"
						id="question"
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="answer"> جواب : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="answer"
						id="answer"
					/>
				</div>
			</form>
		</Modal>
	);
};

export default AddModal;
