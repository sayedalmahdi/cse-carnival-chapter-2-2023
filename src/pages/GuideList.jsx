import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { Card, Col, Row } from "antd";
import CustomCard from "../components/CustomCard";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const GuideList = () => {
	const [guides, setGuides] = useState([]);

	const fetchGuides = async () => {
		const ref = collection(db, "users");
		const q = query(ref, where("approved", "==", true));

		const querySnapshot = await getDocs(q);

		const guideList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
							{guides.map((guide) => (
								<Col key={guide.id} span={8}>
									<CustomCard guide={guide} />
								</Col>
							))}
						</Row>
					</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		</>
	);
};

export default GuideList;
