import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../provider/AuthProvider";

const AddServices = () => {
  const { user, loading } = useContext(AuthContext);
  const [consultant, setConsultants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/consultantdetails/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setConsultants(data));
  }, [user, loading]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    data.status = "pending";
    data.consultantName = consultant.name;
    data.profession = consultant.profession;
    data.email = consultant.email;
    data.consultantId = consultant._id;

    fetch("http://localhost:5000/consultant/addservice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Services successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
        }
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center md:my-50">
        <div
          className="p-5 m-5 md:w-5/12 rounded-2xl space-y-2"
          style={{ border: "2px solid #e2136e" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                {...register("consultantName")}
                name="consultantName"
                className="input input-bordered"
                defaultValue={consultant.name}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Title</span>
              </label>
              <input
                type="text"
                required
                {...register("serviceTitle")}
                name="serviceTitle"
                placeholder="Service title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profession</span>
              </label>
              <input
                type="text"
                required
                {...register("profession")}
                name="profession"
                defaultValue={consultant.profession}
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Photo</span>
              </label>
              <input
                type="text"
                required
                {...register("servicePhoto")}
                name="servicePhoto"
                placeholder="Service photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Desription</span>
              </label>
              <input
                type="text"
                required
                {...register("desription")}
                name="desription"
                placeholder="Description"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Hourly Rate</span>
              </label>
              <input
                type="text"
                required
                {...register("rate")}
                name="rate"
                placeholder="Hourly Rate in Taka"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <input
                className="bg-[#e2136e] text-white font-semibold rounded py-1 cursor-pointer"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
