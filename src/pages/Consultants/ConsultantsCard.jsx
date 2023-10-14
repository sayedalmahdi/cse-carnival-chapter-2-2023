import moment from "moment";
const ConsultantsCard = ({ consultant }) => {
  const { name, profession, exprience, registrationTime, photo } =
    consultant;
  return (
    <div className="card w-72 mx-auto bg-base-100 shadow-md dark:bg-slate-700">
      <img
        src={photo}
        alt="Instructor"
        className="w-full h-72 p-2 rounded-xl"
      />
      <div className="card-body items-center text-center -mt-3 dark:text-white">
        <h2 className="card-title text-2xl">{name}</h2>
        <div className="flex justify-between">
          <p className="bg-gray-100 px-2 rounded-xl uppercase text-xs">
            {profession}
          </p>
          <p className="bg-gray-100 px-2 rounded-xl uppercase text-xs">
            {exprience} Years of Exprience
          </p>
        </div>
        <p>Joinded: {moment(registrationTime).format("LL")}</p>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-accent btn-xs">Reviews</button>
          <button className="btn btn-outline btn-accent btn-xs">
            Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantsCard;
