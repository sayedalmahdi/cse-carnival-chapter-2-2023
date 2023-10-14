import { useEffect, useState } from "react";
import ConsultantsCard from "./ConsultantsCard";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  useEffect(() => {
    fetch("consultants.json")
      .then((res) => res.json())
      .then((data) => setConsultants(data));
  }, []);
  return (
    <div className="grid grid-cols-5">
      {consultants.map((consultant) => (
        <ConsultantsCard
          key={consultant.id}
          consultant={consultant}
        ></ConsultantsCard>
      ))}
    </div>
  );
};

export default Consultants;
