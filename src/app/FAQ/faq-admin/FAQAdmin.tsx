"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {InputRef,PopconfirmProps,TableColumnsType,TableColumnType,} from "antd";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DataType } from "../models";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import fetchDataQuery from "./fetchDataQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
type DataIndex = keyof DataType;

interface FAQAdminProps {
  fetchUrl: string;
  deleteUrl: string;
  AddModal: React.FC<{ open: boolean; onCancel: () => void }>;
  EditModal: React.FC<{ open: boolean; onCancel: () => void; data: DataType }>;
}

const useDeleteFAQ = (deleteUrl: string) => {
   const queryClient = useQueryClient();

   return useMutation({
     mutationFn: async (record: DataType) => {
       const res = await fetch(`${deleteUrl}/${record.id}`, {
         method: "DELETE",
       });
       if (!res.ok) {
         throw new Error("Network response was not ok");
       }
       return res.json(); // Return response data if needed
     },
     onSuccess: () => {
       queryClient.invalidateQueries(["faqs"]); // Invalidate the 'faqs' query
     },
     onError: (error) => {
       console.error("❌ Error deleting record:", error);
     },
   });
 };


const FAQAdmin: React.FC<FAQAdminProps> = ({
  fetchUrl,
  deleteUrl,
  AddModal,
  EditModal,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType>();
  const deleteFAQ = useDeleteFAQ(deleteUrl);

  // const { data: jsonServerData, setData: setJsonServerData } = useFetchData(fetchUrl);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["faqs", fetchUrl],
    queryFn: () => fetchDataQuery(fetchUrl),
    refetchOnWindowFocus:false,
  });

  const [scrollY, setScrollY] = useState(500);
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    updateScrollY();
    window.addEventListener("resize", updateScrollY);
    return () => window.removeEventListener("resize", updateScrollY);
  }, [setScrollY]);

  const handleDelete = async (record: DataType) => {
   deleteFAQ.mutate(record)
   //  try {
   //    const res = await fetch(`${deleteUrl}/${record.id}`, {
   //      method: "DELETE",
   //    });
   //    if (!res.ok) {
   //      throw new Error("Network response was not ok");
   //    }
   //  } catch (error) {
   //    console.error("❌ Error deleting record:", error);
   //  }
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
    setIsEditModalOpen(true);
  };

  const updateScrollY = () => {
    if (window.innerWidth >= 1280) {
      setScrollY(700);
    } else {
      setScrollY(300);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
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
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
            onConfirm={() => handleDelete(record)}
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
    //  <Flex gap="small" dir="rtl" vertical className=" rounded-md p-2 ">
    //    <AddModal open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} />
    //    <EditModal
    //      open={isEditModalOpen}
    //      onCancel={() => setIsEditModalOpen(false)}
    //      data={selectedRow}
    //    />
    //    <Button onClick={() => showAddModal()} type="primary">
    //      add new FAQ
    //    </Button>
    //    <Table<DataType>
    //       columns={columns}
    //      dataSource={jsonServerData}
    //      scroll={{ y: scrollY, x: "overflow-x-hidden" }}
    //    />
    //  </Flex>

    <Flex gap="small" dir="rtl" vertical className=" rounded-md p-2 ">
      {/* AddModal and EditModal components */}
      <AddModal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
      />
      <EditModal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        data={selectedRow}
      />
      <Button onClick={() => showAddModal()} type="primary">
        add new FAQ
      </Button>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <Table<DataType>
          columns={columns}
          dataSource={data as DataType[]}
          scroll={{ y: scrollY, x: "auto" }}
        />
      )}
    </Flex>
  );
};

export default FAQAdmin;
