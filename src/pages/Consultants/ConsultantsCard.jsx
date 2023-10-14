const ConsultantsCard = ({ consultant }) => {
  const { name, profssion, rating, exprience, joined, photo } = consultant;
  return (
    <div className="card w-72 mx-auto bg-base-100 shadow-md dark:bg-slate-700">
      <img
        src={photo}
        alt="Instructor"
        className="w-full h-72 p-2 rounded-xl"
      />
      <div className="card-body items-center text-center -mt-3 dark:text-white">
        <h2 className="card-title text-2xl">{name}</h2>
        <p className="bg-gray-100 px-2 rounded-xl">{profssion}</p>
        <p className="bg-gray-100 px-2 rounded-xl">
          {exprience} Years of Exprience
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ConsultantsCard;
