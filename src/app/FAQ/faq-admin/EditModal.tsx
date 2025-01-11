import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "../models";

type Props = {
	open: boolean;
	onCancel: () => void;
	data: DataType | null;
};

const EditModal = ({ open, onCancel, data }: Props) => {

   console.log("🟢" + data?.answer , data?.category , data?.question);
   const [formData ,setFormData] = useState<any>({
         category: "",
         question: "",
         answer: "",
      })

   useEffect(() => {
      data && setFormData({ category:data.category|| "" , question:data.question||"" , answer: data.answer|| ""})
   }, [data])

   const handleInputChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const {name  , value } = e.target
      setFormData((prev:any)=>({...prev , [name]:value}))
   }


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if(!data?.id){
         console.error("❌ Error: No ID found for the FAQ item.");
			return;
      }
      try {
         const res =await fetch(`http://localhost:3500/items/${data.id}` , {
            method:'PATCH',
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
         })
         if(!res.ok) throw new Error("Network response was not ok");
         const result = await res.json()
         setFormData(result)
         onCancel();
      } catch (error) {
         console.error("❌ Error:", error);
      }
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
			>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="category"> دسته بندی : </label>
					<input
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						type="text"
						name="category"
						id="category"
                  value={formData.category}
                  onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="question"> سوال : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="question"
						id="question"
                  value={formData.question}
                  onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col justify-between items-start w-full">
					<label htmlFor="answer"> جواب : </label>
					<textarea
						className="w-full border-[1px] p-1 my-1 border-blue-200 rounded"
						name="answer"
						id="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default EditModal;
