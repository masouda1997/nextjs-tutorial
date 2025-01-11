"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {
	InputRef,
	PopconfirmProps,
	TableColumnsType,
	TableColumnType,
} from "antd";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { DataType } from "../models";

type DataIndex = keyof DataType;

const faqFakeData: DataType[] = [
	{
		id: 1,
		question: "How do I reset my password?",
		answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email.",
		category: "Accounts",
		status: "active",
		created_at: "2025-01-01T10:00:00Z",
		updated_at: "2025-01-02T12:30:00Z",
	},
	{
		id: 2,
		question: "What is your refund policy?",
		answer: "Refunds are available within 30 days of purchase. Please contact support with your order details to initiate a refund.",
		category: "Billing",
		status: "active",
		created_at: "2024-12-20T08:15:00Z",
		updated_at: "2024-12-21T14:45:00Z",
	},
	{
		id: 3,
		question: "Can I change my subscription plan?",
		answer: "Yes, you can change your subscription plan at any time from the 'My Account' section. Additional charges may apply for upgrades.",
		category: "Subscriptions",
		status: "inactive",
		created_at: "2024-11-15T16:25:00Z",
		updated_at: "2024-11-18T09:00:00Z",
	},
	{
		id: 4,
		question: "How do I contact support?",
		answer: "You can contact support by emailing us at support@example.com or by using the live chat option available on our website.",
		category: "Support",
		status: "active",
		created_at: "2024-10-10T11:00:00Z",
		updated_at: "2024-10-10T11:00:00Z",
	},
	{
		id: 5,
		question: "What are the system requirements for your software?",
		answer: "Our software requires at least 8GB of RAM, a 2GHz dual-core processor, and 1GB of free disk space. It supports Windows 10 and macOS 11.0 or higher.",
		category: "Technical",
		status: "active",
		created_at: "2024-09-05T07:30:00Z",
		updated_at: "2024-09-05T07:30:00Z",
	},
	{
		id: 6,
		question: "How do I reset my password?",
		answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email.",
		category: "Accounts",
		status: "active",
		created_at: "2025-01-01T10:00:00Z",
		updated_at: "2025-01-02T12:30:00Z",
	},
	{
		id: 7,
		question: "What is your refund policy?",
		answer: "Refunds are available within 30 days of purchase. Please contact support with your order details to initiate a refund.",
		category: "Billing",
		status: "active",
		created_at: "2024-12-20T08:15:00Z",
		updated_at: "2024-12-21T14:45:00Z",
	},
	{
		id: 8,
		question: "Can I change my subscription plan?",
		answer: "Yes, you can change your subscription plan at any time from the 'My Account' section. Additional charges may apply for upgrades.",
		category: "Subscriptions",
		status: "inactive",
		created_at: "2024-11-15T16:25:00Z",
		updated_at: "2024-11-18T09:00:00Z",
	},
	{
		id: 9,
		question: "How do I contact support?",
		answer: "You can contact support by emailing us at support@example.com or by using the live chat option available on our website.",
		category: "Support",
		status: "active",
		created_at: "2024-10-10T11:00:00Z",
		updated_at: "2024-10-10T11:00:00Z",
	},
	{
		id: 10,
		question: "What are the system requirements for your software?",
		answer: "Our software requires at least 8GB of RAM, a 2GHz dual-core processor, and 1GB of free disk space. It supports Windows 10 and macOS 11.0 or higher.",
		category: "Technical",
		status: "active",
		created_at: "2024-09-05T07:30:00Z",
		updated_at: "2024-09-05T07:30:00Z",
	},
];

const FAQAdmin: React.FC = () => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<DataType | null>(null);

	const showAddModal = () => {
		setIsAddModalOpen(true);
	};
	const showEditModal = (row: DataType) => {
		setSelectedRow(row);
		setTimeout(() => {
			console.log(row);
			setIsEditModalOpen(true);
		}, 300);
	};

	const handleCancelAdd = () => {
		setIsAddModalOpen(false);
	};
	const handleCancelEdit = () => {
		setIsEditModalOpen(false);
	};

	const searchInput = useRef<InputRef>(null);

	const confirm: PopconfirmProps["onConfirm"] = (e) => {
		console.log(e);
		// message.success('Click on Yes');
	};

	const cancel: PopconfirmProps["onCancel"] = (e) => {
		console.log(e);
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps["confirm"],
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): TableColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex
						)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() =>
							clearFilters && handleReset(clearFilters)
						}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? "#1677ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const columns: TableColumnsType<DataType> = [
		{
			title: "سوال",
			dataIndex: "question",
			key: "question",
			width: "30%",
			...getColumnSearchProps("question"),
		},
		{
			title: "جواب",
			dataIndex: "answer",
			key: "answer",
			width: "50%",
			...getColumnSearchProps("answer"),
		},
		{
			title: "دسته بندی",
			dataIndex: "category",
			key: "category",
			width: "10%",
			...getColumnSearchProps("category"),
			sorter: (a, b) => a.category.length - b.category.length,
			sortDirections: ["descend", "ascend"],
		},
		{
			title: " ",
			width: "10%",
			key: "action",
			render: (text, record) => (
				<span className="flex justify-evenly ">
					<Popconfirm
						title="حذف ردیف موردنظر  "
						description="آیا از حذف این ردیف اطمینان دارید!؟ "
						onConfirm={confirm}
						onCancel={cancel}
						okText="بله "
						cancelText="خیر"
					>
						<Button
							className="w-max py-5"
							type="primary"
							danger
							onClick={() => console.log("first")}
						>
							<AiFillDelete />
						</Button>
					</Popconfirm>
					&nbsp;
					<Button
						className="w-max py-5"
						type="primary"
						onClick={() => showEditModal(record)}
					>
						<AiFillEdit />
					</Button>
				</span>
			),
		},
	];

	return (
		<Flex gap="small" dir="rtl" vertical className=" rounded-md p-2 ">
			<AddModal open={isAddModalOpen} onCancel={handleCancelAdd} />
			<EditModal
				open={isEditModalOpen}
				onCancel={handleCancelEdit}
				data={selectedRow}
			/>
			<Button onClick={() => showAddModal()} type="primary">
				add new FAQ
			</Button>
			<Table<DataType>
				columns={columns}
				dataSource={faqFakeData}
				scroll={{ y: 300, x: "overflow-x-hidden" }}
			/>
		</Flex>
	);
};

export default FAQAdmin;
