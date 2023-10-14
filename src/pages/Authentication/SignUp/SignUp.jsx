import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const SignUp = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const onSubmit = (data) => {
    console.log(data)
  };
  const handleConfim = (e) => {
    const confirmPassword = e?.target?.value;
    setConfirmPassword(confirmPassword);
  };
  return (
    <div>
      <div className="flex justify-center items-center md:my-50">
        <div
          className="p-5 m-5 md:w-3/12 rounded-2xl space-y-2"
          style={{ border: "2px solid #e2136e" }}
        >
          <div className="flex justify-center">
            {isCustomer ? (
              <button
                onClick={() => setIsCustomer(false)}
                className="btn btn-outline btn-accent btn-xs"
              >
                Register as Consultant
              </button>
            ) : (
              <button
                onClick={() => setIsCustomer(true)}
                className="btn btn-outline btn-accent btn-xs"
              >
                Register as Customer
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-700">
            SignUp as {isCustomer ? "Customer" : "Consultant"}
          </h2>
          {errormsg.length > 2 && (
            <p className="text-center border border-[#e2136e] text-[#e2136e] text-sm my-1 font-semibold rounded-md">
              {errormsg}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                name="name"
                placeholder="ex: Mohibul Refat"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                required
                {...register("email")}
                name="email"
                placeholder="ex: mirza@mohibul.com"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                required
                {...register("phone")}
                name="phone"
                placeholder="ex: +8801991347811"
                className="input input-bordered"
              />
            </div>
            {!isCustomer && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">NID</span>
                </label>
                <input
                  type="text"
                  required
                  {...register("nid")}
                  name="nid"
                  placeholder="ex: 77436673"
                  className="input input-bordered"
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                required
                {...register("address")}
                name="address"
                placeholder="ex: Badda, Dhaka-1200"
                className="input input-bordered"
              />
            </div>
            {!isCustomer && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profession type</span>
                </label>
                <select
                  className="text-input bg-gray-200 px-5 py-2 rounded"
                  {...register("category")}
                >
                  <option value="ethical-hacker">Ethical Hacker</option>
                  <option value="video-editor">Video Editor</option>
                  <option value="script-writter">Tech Script Writter</option>
                  <option value="iot-expert">IOT Expert</option>
                  <option value="os-expert">Operating System Expert</option>
                  <option value="startup-mentor">Start-up Mentor</option>
                </select>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                {...register("password", {
                  minLength: 6,
                //   pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                })}
                placeholder="Your password"
                className="input input-bordered"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be more than six characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase and one special character.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                onChange={handleConfim}
                type="password"
                required
                placeholder="Confirm Password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photo")}
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="bg-[#e2136e] text-white font-semibold rounded py-1"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <h4 className="my-3 text-sm text-gray-500 font-semibold text-center">
            Already registered?{" "}
            <Link to="/login" className="text-[#e2136e]">
              Log in
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
