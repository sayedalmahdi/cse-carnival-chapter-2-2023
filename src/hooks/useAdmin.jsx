import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/users/admin/${user?.email}`
      );
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
