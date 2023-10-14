import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  console.log(services);
  return (
    <div className="mt-5">
      {services.map((service) => (
        <ServicesCard key={service._id} service={service}></ServicesCard>
      ))}
    </div>
  );
};

export default Services;
