//引入zustand
import { create } from "zustand";
// 定义store的类型
type Store = {
    //当前的技能的名字
    currentSkill: string;
    setCurrentSkill: (skill: string) => void;
    //副标题的内容
    welcomeContent: string;
    setWelcomeContent: (welcomecontent: string) => void;
    //大标题的内容
    welcome: string;
    setWelcome: (welcome: string) => void;
    //隐藏还是显示输入框里的返回按钮
    showButton: boolean;
    setShowButton: (showButton: boolean) => void;
};

//创建store
export const useStore = create<Store>((set) => ({
    currentSkill: '',
    setCurrentSkill: (skill: string) => {
        set(() => {
            return {
                currentSkill: skill ,
            }
        })
    },
    // 副标题的
    welcomeContent: '',
    setWelcomeContent: (welcomecontent: string) => {
        set(() => {
            return {
                welcomeContent: welcomecontent,
            }
        })
    }
    ,
    // 大标题的
    welcome: '',
    setWelcome: (welcome: string) => {
        set(() => {
            return {
                welcome: welcome,
            }
        })
    },
    //隐藏还是显示输入框里的返回按钮
    showButton: false,
    setShowButton: (showButton: boolean) => {
        set(() => {
            return {
                showButton: showButton,
            }
        })
    }
}
))
