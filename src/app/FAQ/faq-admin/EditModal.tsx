import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "../models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onCancel: () => void;
  data: DataType | null;
};

export interface FormDataType {
  category: string;
  question: string;
  answer: string;
}

const EditModal = ({ open, onCancel, data }: Props) => {
  const queryClient = useQueryClient(); // Access the query client instance

  const { mutate: updateFAQ, isLoading } = useMutation({
    mutationFn: (formData: FormDataType) =>
      fetch(`http://localhost:3500/items/${data?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]); // Invalidate the 'faqs' query
      setFormData({ category: "", question: "", answer: "" }); // Reset the form data
      onCancel(); // Close the modal
    },
    onError: (error) => {
      console.error("❌ Error:", error);
    },
  });

  const [formData, setFormData] = useState<FormDataType>({
    category: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        category: data.category || "",
        question: data.question || "",
        answer: data.answer || "",
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data?.id) {
      updateFAQ(formData);
    } else {
      console.error("❌ Error: No ID found for the FAQ item.");
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

