import { User } from "@/components/login/login"
import axios from "axios"

interface LoginResponse {
    code: number, msg: string; user_info: {
        nickname: string,
        email: string,
        phone: number
    }
}
//登陆的接口
export const login = async (userData:User) => {
 const response = await axios.post<LoginResponse>('/api/login', { data: userData });
console.log(response.data);
return response.data;
}
