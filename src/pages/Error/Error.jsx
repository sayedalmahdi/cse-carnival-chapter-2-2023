import { BiErrorAlt } from "react-icons/bi";
import { Link, useRouteError } from "react-router-dom";
const Error = () => {
  const { status } = useRouteError();
  return (
    <section className="flex items-center h-screen p-16 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <BiErrorAlt className="text-9xl text-[#dc3545]"></BiErrorAlt>

        <div className="max-w-md text-center mb-5">
          <h2 className="font-extrabold text-3xl text-[#dc3545]">
            <span className="sr-only ">Error</span> {status || 404}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            No route matches
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded bg-[#dc3545] hover:bg-gray-500 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
