import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            res => res,
            async error => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    // await logOut();
                    // navigate("/login");
                }
                return Promise.reject(error); // Add this to avoid unhandled promise issues
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure
}

export default useAxiosSecure;