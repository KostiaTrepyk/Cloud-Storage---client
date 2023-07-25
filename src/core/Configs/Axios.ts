import axios from "axios";

export const axiosConfig = () => {
	axios.defaults.baseURL = "http://localhost:5000";
};
