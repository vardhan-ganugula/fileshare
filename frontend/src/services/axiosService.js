import axios from "axios";


const axiosProfile = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    headers : {
        "Content-Type" : 'application/json'
    }
});



export const downloadFile = async ({code})=> {
    const result = await axiosProfile.get(`/get-file?code=${code}`)
    return result;
}


export default axiosProfile;

