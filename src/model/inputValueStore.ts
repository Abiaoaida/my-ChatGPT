//引入zustand
import { create } from "zustand";
// 定义输入框的内容类型
type InputValueStore = {
    // 输入框的内容
    inputValue: string;
    setInputValue: (inputValue: string) => void;
}
// 创建store
export const useInputValueStore = create<InputValueStore>((set) => ({
    inputValue: '',
    setInputValue: (inputValue: string) => {
        set(() => {
            return {
                inputValue: inputValue,
            }
        })
    }
}))
