//引入zustand
import { create } from "zustand";
// 定义后端返回的用户信息的tore的类型
type UserInfo = {
  nickname: string
  email: string
  phone: number
}
type UserInfoStore  = {
  userInfo: UserInfo,
  setUserInfo: (userInfo: UserInfo) => void
}
// 创建loginStore
const useLoginStore = create<UserInfoStore>((set) => ({
  userInfo: {
    nickname: '',
    email: '',
    phone: 0
  }
  ,
  setUserInfo: (userInfo: UserInfo) => set({ userInfo })
}))
export default useLoginStore;
