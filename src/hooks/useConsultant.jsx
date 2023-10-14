import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useConsultant = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: isConsultant, isLoading: isConsultantLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["isConsultant", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/consultant/${user?.email}`);
      return res.data?.isConsultant;
    },
  });
  return [isConsultant, isConsultantLoading];
};

export default useConsultant;
