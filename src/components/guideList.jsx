import React, { useState, useEffect } from "react";
import { Tabs, List, Pagination } from "antd";
import { db } from "../firebase"; // Replace with your Firebase configuration and setup

const GUIDES_PER_PAGE = 10; // Number of guides to fetch per page

const getGuidesByStatus = async (status, page) => {
	try {
		const guidesRef = db.collection("guides");
		const guidesQuery = guidesRef
			.where("status", "==", status)
			.orderBy("createdAt", "desc") // Assuming guides have a createdAt timestamp
			.limit(GUIDES_PER_PAGE)
			.offset((page - 1) * GUIDES_PER_PAGE);

		const snapshot = await guidesQuery.get();
		const guides = [];
		snapshot.forEach((doc) => {
			const guide = doc.data();
			guides.push({
				id: doc.id,
				...guide,
			});
		});

		return guides;
	} catch (error) {
		throw new Error("Error fetching guides:", error);
	}
};

const { TabPane } = Tabs;

const Guides = () => {
    const [selectedTab, setSelectedTab] = useState("1");
	const [current, setCurrent] = useState(1);
	const [totalGuides, setTotalGuides] = useState(0);
	const [guides, setGuides] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { guides, totalGuides } = await getGuidesByStatus(
					"active",
					current
				);
				setGuides(guides);
				setTotalGuides(totalGuides);
			} catch (error) {
				console.error("Error fetching guides:", error);
			}
		};

		fetchData();
	}, [current]);

	const onChange = (page) => {
		setCurrent(page);
	};
	const handleTabChange = (key) => {
		setSelectedTab(key);
		setCurrentPage(1); // Reset to the first page when changing tabs
	};

	return (
		<div>
			<Tabs defaultActiveKey={selectedTab} centered onChange={handleTabChange}>
				{/* ... TabPanels ... */}
			</Tabs>
			<div>
				<List
					dataSource={guides}
					renderItem={(item) => (
						<List.Item key={item.id}>{item.name}</List.Item>
					)}
				/>
				<Pagination
					current={current}
					onChange={onChange}
					total={totalGuides}
					pageSize={GUIDES_PER_PAGE}
				/>
			</div>
		</div>
	);
};

export default Guides;
