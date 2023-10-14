import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Card, Col, Row } from "antd";
import CustomCard from "../components/CustomCard";
const GuideList = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Header
            style={{
              backgroundColor: "#458bdf",
              color: "white",
            }}
          >
            Header
          </Header>
          <Content style={{ padding: "40px" }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <CustomCard  />
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
            </Row>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default GuideList;
