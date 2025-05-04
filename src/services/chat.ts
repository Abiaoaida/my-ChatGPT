
import { Conversion } from "@/components/right/Input/Input";
import axios from "axios";

// chat接口，是个异步函数
export const chat = async (conversationData: Conversion[]) => {
    const response = await axios.post<{ data: Conversion[] }>('/api/chat', { data: conversationData }, { withCredentials: true } )
    console.log(response.data)
    return response.data
}
export const ai = async (conversationData: Conversion[]) => {
    const response = await axios.post<{data:Conversion[]}>('/api/ai', { data: conversationData },{ withCredentials: true })
    console.log(response.data)
    return response.data
}

