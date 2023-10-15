import React from "react";
import { Timeline } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const timelineData = [
  {
    children: "Create a services site",
  },
  {
    children: "Solve initial network problems",
  },
  {
    children: "Technical testing",
  },
  {
    children: "Network problems being solved",
  },
];

const Offering = () => (
  <Timeline className="bg-white rounded-b-lg p-10" mode="right">
    {timelineData.map((item, index) => (
      <Timeline.Item
        key={index}
        dot={<CheckCircleOutlined style={{ fontSize: "10px" }} />}
        color={index % 2 === 0 ? "blue" : "green"} // Alternate colors
      >
        {item.children} <br /> <small>{item.date}</small>
      </Timeline.Item>
    ))}
  </Timeline>
);

export default Offering;
