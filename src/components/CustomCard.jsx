import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { StarFilled, EnvironmentOutlined } from "@ant-design/icons";

const CustomCard = () => {
  const [name, setName] = useState("Card Name");
  const [review, setReview] = useState(4.5);
  const [image, setImage] = useState(
    "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/11/1e/4a/33/pangthumai-waterfall.jpg"
  );
  const [location, setLocation] = useState("Location");
  const [price, setPrice] = useState("450 BDT");

  return (
    <>
      <Card
        className="shadow transform hover:scale-105 transition-transform duration-300"
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              paddingTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Avatar size={50} />
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontSize: 18 }}>{name}</div>
              <div style={{ color: "brown" }}>
                <StarFilled style={{ color: "orange", marginRight: 4 }} />
                {review} (Reviews)
              </div>
            </div>
          </div>
        }
      >
        <div>
          <img
            className="rounded-lg"
            src={image}
            alt="Card"
            style={{ width: "100%", height: "auto", margin: "5px 0" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EnvironmentOutlined
              style={{ marginRight: "4px", fontSize: "16px", color: "gray" }}
            />
            <div style={{ fontSize: "14px" }}>{location}</div>
          </div>
          <div
            style={{
              marginRight: "8px",
              color: "green",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {price}
          </div>
        </div>
      </Card>
    </>
  );
};

export default CustomCard;
