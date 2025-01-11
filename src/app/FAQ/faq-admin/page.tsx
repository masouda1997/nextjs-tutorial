"use client";

import React, { useEffect, useRef, useState } from "react";
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


const fetchData = async () : Promise<DataType[]> =>{
   try {
      const res = await fetch('http://localhost:3500/items')
      if(!res.ok){
         throw new Error ("network response not ok")
      }
      const  data = await res.json()
      return data
   } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
   }
}


const FAQAdmin: React.FC = () => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
   const [jsonServerData , setJsonServerData ] = useState<any>('')
   const [scrollY, setScrollY] = useState(500); // Default scroll.y value
	const searchInput = useRef<InputRef>(null);


   useEffect(() => {
      const getFAQs = async () => {
        try {
          const data = await fetchData(); // Await the result of fetchData
          setJsonServerData(data); // Set the resolved data to jsonServerData
          console.log("data✅", data); // Log the resolved data
        } catch (error) {
          console.error("Error fetching FAQs:", error);
        }
      };
      getFAQs(); // Call the async function
   }, []);
   useEffect(() => {
      updateScrollY(); // Set initial value
		window.addEventListener("resize", updateScrollY);
		// Cleanup event listener when component unmount happen
		return () => {
			window.removeEventListener("resize", updateScrollY);
		};
   }, [])


   const handleDelete = async(record:DataType) => {
      try {
         const res = await fetch (`http://localhost:3500/items/${record.id}`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         if (!res.ok) {
				throw new Error("Network response was not ok");
			}
         // setJsonServerData(prevData =>(
         //    prevData.filter(item => item.id === record.id)
         // ))
      } catch (error) {
         console.error("❌ Error deleting record:", error);
			message.error("خطا در حذف ردیف!");
      }
   }
	const handleCancelAdd = () => {
		setIsAddModalOpen(false);
	};
	const handleCancelEdit = () => {
		setIsEditModalOpen(false);
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
   const updateScrollY = () => {
      if (window.innerWidth >= 1280) {
         setScrollY(700);
      } else {
         setScrollY(300);
      }
   };
   const cancel: PopconfirmProps["onCancel"] = (e) => {console.log(e);};

	const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
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
						onConfirm={()=>handleDelete(record)}
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
               dataSource={jsonServerData? jsonServerData : []}
               scroll={{ y: scrollY, x: "overflow-x-hidden" }}
            />
		</Flex>
	);
};

export default FAQAdmin;
