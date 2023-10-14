import useAdmin from "../../hooks/useAdmin";
import useConsultant from "../../hooks/useConsultant";

const ServicesCard = ({ service }) => {
  const { serviceTitle, consultantName, servicePhoto, profession, rate } =
    service;
  const [isAdmin] = useAdmin();
  const [isConsultant] = useConsultant();
  return (
    <div className="card w-80 md:w-96 mx-auto bg-base-100 dark:bg-slate-700 shadow-xl">
      <img
        className="w-80 h-72 rounded-xl mx-auto"
        src={servicePhoto}
        alt="Shoes"
      />
      <div className="card-body dark:text-white text-[14px]">
        <div className="flex justify-between">
          <h2 className="card-title">{serviceTitle}</h2>
        </div>
        <p>Instructor: {consultantName}</p>
        <p>Profession: {profession}</p>
        <div className="card-actions justify-end items-center">
          <p className="text-xl font-semibold">TK{rate}/hr</p>
          <button
            disabled={isAdmin || isConsultant}
            className="btn btn-primary bg-[#e2136e] border-none btn-sm dark:text-gray-950 dark:bg-white text-white"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
