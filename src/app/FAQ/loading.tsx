import { Card, Col, Row, Spin } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={12} className="flex items-center justify-center">
        <Card>
          <Spin tip="در حال بارگذاری." />
        </Card>
      </Col>
    </Row>
  );
}
