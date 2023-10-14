import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext)

    return [false, false];
}
export default useAdmin;