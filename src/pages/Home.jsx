import React, { useState, useEffect } from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 15) {
      setIsHeaderOpaque(true);
    } else {
      setIsHeaderOpaque(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Header
        className={isHeaderOpaque ? "opaque-header" : "transparent-header"}
      ></Header>
      <Content style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <img
          src="https://a.cdn-hotels.com/gdcs/production129/d1735/5f9ad8cb-e195-49ef-8206-f95dba366ffd.jpg?impolicy=fcrop&w=800&h=533&q=medium"
          alt="background"
        />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Home;
