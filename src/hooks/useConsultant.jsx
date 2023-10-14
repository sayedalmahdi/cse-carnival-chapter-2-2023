import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useConsultant = () => {
    const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  console.log(user)
  const { data: isConsultant, isLoading: isConsultantLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["isConsultant", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`http://localhost:5000/users/consultant/${user?.email}`);
      return res.data.consultant;
    },
  });
  return [false, false];
};

export default useConsultant;
