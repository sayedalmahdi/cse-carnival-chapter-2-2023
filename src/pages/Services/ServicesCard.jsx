import { useContext } from "react";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useConsultant from "../../hooks/useConsultant";
import { AuthContext } from "../../provider/AuthProvider";

const ServicesCard = ({ service }) => {
  const { user } = useContext(AuthContext);

  const handleBookNow = (service) => {
    console.log(service);
    const bookService = {
      name: service.consultantName,
      profession: service.profession,
      consultantMail: service.email,
      title: service.serviceTitle,
      rate: service.rate,
      image: service.servicePhoto,
      email: user?.email
    }
    fetch('http://localhost:5000/bookServices', {
       method: 'POST',
       headers: {
           'content-type': 'application/json'
       },
       body: JSON.stringify(bookService)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Booked The Service',
            showConfirmButton: false,
            timer: 700
        });
      }
    })
  }

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
          <button onClick={()=>handleBookNow(service)}
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
