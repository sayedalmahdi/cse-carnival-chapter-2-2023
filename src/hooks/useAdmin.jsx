import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext)

    return [true, false];
}
export default useAdmin;