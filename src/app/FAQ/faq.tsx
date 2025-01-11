"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { Space, Collapse, Result, Empty, Row, Col } from "antd";
import { AddMore, CustomArrowDown, CustomArrowUp } from "./ConstantTag";
import { FaqBaseUrl } from "./BaseUrl";
import { faqModel } from "./models";
import Loading from "./loading";

export interface CustomFaqProps {
  direction?: "horizontal" | "vertical";
  title?: string;
  description?: string;
  activeItemIndex?: string;
  url?: string;
  appId: string;
  page?: number;
  titleClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  descriptionClassName?: string;
  accordionClassName?: string;
  emptyChildren?: ReactNode;
  errorChildren?: ReactNode;
  loadingChidren?: ReactNode;
}

const EntekhabFaq: React.FC<CustomFaqProps> = ({
  direction = "vertical",
  title,
  description,
  activeItemIndex = "1",
  url = FaqBaseUrl,
  appId = "",
  page = 4,
  titleClassName = "flex text-center justify-center text-font32",
  descriptionClassName = "text-center justify-center mt-5 mb-7 text-font16",
  contentClassName = "bg-white w-full  text-font12",
  headerClassName = "w-full h-full !bg-[#EFEFF1]  text-font14 ",
  accordionClassName = "w-full",
  emptyChildren = <Empty description="داه ای  موجود نیست" />,
  errorChildren = <Result status="warning" title={"بروز خطا در واکشی اخبار"} />,
//   loadingChidren = (
//     <Card>
//       <Spin tip="در حال بارگذاری..."></Spin>
//     </Card>
//   ),
  ...props
}) => {
  const [itemsToShow, setItemsToShow] = useState(page);
  const [openPanels, setOpenPanels] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<faqModel>();
//   const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // setIsloading(true);
      setError("");
      try {
        const params = new URLSearchParams({ appId: appId });
        const response = await fetch(`${url}?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message?.value || "Error fetching data");
        }
        const result: faqModel = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
      // finally {
      //   setIsloading(false);
      // }
    };
    fetchData();
    setOpenPanels((prev) => ({
      ...prev,
      [activeItemIndex]: true,
    }));
  }, [url, appId, activeItemIndex]);

  const totalItems = data?.data?.length || 0;

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + page);
  };

  const expandIcon = (panelProps: { isActive?: boolean }) => {
    const { isActive } = panelProps;
    return isActive ? <CustomArrowUp /> : <CustomArrowDown />;
  };

  const onCollapseChange = (key: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

//   if (isloading) {
//     return (
//       <Row justify="center" align="middle">
//         <Col xs={24} md={12} className="flex items-center justify-center">
//           {loadingChidren}
//         </Col>
//       </Row>
//     );
//   }

  if (error.trim() !== "") {
    return (
      <Row justify="center" align="middle">
        <Col xs={24} md={12} className="flex items-center justify-center">
          {errorChildren}
        </Col>
      </Row>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <Row justify="center" align="middle">
        <Col xs={24} md={12} className="flex items-center justify-center">
          {emptyChildren}
        </Col>
      </Row>
    );
  }

  return (
    <>
      <div {...props}>
        <Space className={accordionClassName} direction={direction}>
          {title && <div className={titleClassName}>{title}</div>}
          {description && (
            <div className={descriptionClassName}>{description}</div>
          )}
          {/* <Suspense fallback={<Loading/>}> */}
            {
            error.trim() === "" &&
            data?.data &&
            data.data.length > 0 &&
            data.data.slice(0, itemsToShow).map((panel, index: number) => {
              const isOpen = openPanels[`${index}`];
              return (
                <Collapse
                  className="custom-collapse"
                  key={index}
                  defaultActiveKey={[activeItemIndex]}
                  onChange={() => onCollapseChange(`${index}`)}
                  expandIconPosition="start"
                  bordered={false}
                  expandIcon={expandIcon}
                >
                  <Collapse.Panel
                    header={
                      <div
                        key={"div_" + index}
                        className={
                          isOpen
                            ? `${headerClassName
                                .replace(/!bg-\S+/g, "")
                                .trim()} !bg-white`
                            : headerClassName
                        }
                      >
                        {panel.title}
                      </div>
                    }
                    key={index} // Pass the key prop here
                    className={
                      isOpen
                        ? `${headerClassName
                            .replace(/!bg-\S+/g, "")
                            .trim()} !bg-white`
                        : headerClassName
                    }
                  >
                    <div dir="rtl" className={contentClassName}>
                      {panel?.description}
                    </div>
                  </Collapse.Panel>
                </Collapse>
              );
            })}
          {/* </Suspense> */}

        </Space>
        {itemsToShow < totalItems && (
          <div onClick={handleLoadMore} className="mt-2 cursor-">
            <AddMore />
          </div>
        )}
      </div>
    </>
  );
};

export default EntekhabFaq;
