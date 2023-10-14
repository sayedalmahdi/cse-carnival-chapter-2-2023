import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Card, Col, Row } from "antd";
import CustomCard from "../components/CustomCard";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { Typography } from "antd";
const { Title, Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
const GuideList = () => {
  const [guides, setGuides] = useState([]);

  const fetchGuides = async () => {
    const ref = collection(db, "users");
    const q = query(ref, where("role", "==", "guide"));

    const querySnapshot = await getDocs(q);

    const guideList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGuides(guideList);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  console.log(guides);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <nav
            className="p-3 shadow"
            style={{
              backgroundColor: "#458bdf",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title className="title" style={{ color: "white" }} level={3}>
              GoTo
            </Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Text
                style={{
                  fontSize: "18px",
                  color: "#AEDFFA",
                  marginRight: "5px",
                }}
              >
                User
              </Text>
              <UserOutlined
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </div>
          </nav>
          <Content style={{ padding: "40px" }}>
            <Row gutter={[16, 16]}>
              {guides.map((guide) => (
                <Col key={guide.id} span={8}>
                  <CustomCard guide={guide} />
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default GuideList;
