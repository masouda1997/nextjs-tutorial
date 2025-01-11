import { Modal } from "antd";
import React, { useState } from "react";
import { DataType } from "../models";

type Props = {
	open: boolean;
	onCancel: () => void;
	data: DataType | null;
};

const EditModal = ({ open, onCancel, data }: Props) => {
   // const [category, setCategory] = useState(data?.category );
   // const [question, setQuestion] = useState(data?.question );
   // const [answer, setAnswer] = useState(data?.answer );
   
   console.log("🟢" + data?.answer , data?.category , data?.question);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("✅");
		onCancel();
	};
	return (
		<Modal
			title="ویرایش FAQ"
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
                  value={data?.category}
                  onChange={(e) => console.log("object")}
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="question"> سوال : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="question"
						id="question"
                  value={data?.question}
                  onChange={(e)=> console.log("object")}
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="answer"> جواب : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="answer"
						id="answer"
                  value={data?.answer}
                  onChange={(e)=>console.log("object")}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default EditModal;
