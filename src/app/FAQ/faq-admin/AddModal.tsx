import { useMutation ,useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import React, { useState } from "react";

type Props = {
	open: boolean;
	onCancel: () => void;
};

const AddModal = ({ open, onCancel }: Props) => {
   const queryClient = useQueryClient()

   const [formData, setFormData] = useState({
     category: "",
     question: "",
     answer: "",
   });


   const  handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name , value } = e.target
      setFormData((prev) => ({...prev , [name]: value}))
   }

   const addFAQMutation = useMutation({
      mutationFn: (data: any) =>
        fetch('http://localhost:3500/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      onSuccess: () => {
         queryClient.invalidateQueries(["faqs"]); // Invalidate the 'faqs' query
         setFormData({ category: '', question: '', answer: '' });
         onCancel();
      },
      onError: (error) => {
        console.error("❌ Error:", error);
      },
    });

	 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addFAQMutation.mutate(formData);
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
            id="faqForm"
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
         {addFAQMutation.isLoading && <div>Loading...</div>}
         {addFAQMutation.isError && <div>Error: Something went wrong.</div>}
		</Modal>
	);
};

export default AddModal;
