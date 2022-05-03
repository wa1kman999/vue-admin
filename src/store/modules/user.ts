// import { ILoginReq, IUserInfo } from '@/api/types/userModel'
import { defineStore } from 'pinia'
import { IUserInfo } from '@/api/types/userModel'
import { Nullable } from '#/global'
// import { loginApi } from '@/api/user'
// import { router } from '@/router'

interface UserState {
  userInfo: Nullable<IUserInfo>
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined
  }),
  getters: {
    getUserInfo (): IUserInfo | null {
      return this.userInfo
    },
    getToken (): string | undefined {
      return this.token
    }
  },
  actions: {
    setToken (info: string | undefined) {
      this.token = info || ''
    },
    // async login (parames: ILoginReq): Promise<IUserInfo | null> {
    //   try {
    //     const data = await loginApi(parames)
    //     this.setToken(data.data.token)
    //     // 保存token
    //     console.log('打印请求数据')
    //     console.log(data.data.token)
    //     router.push({ name: 'home' })
    //     return data.data.userInfo
    //   } catch (error) {
    //     console.log(error)
    //     return Promise.reject(error)
    //   }
    // }，
    setUserInfo (userInfo: Nullable<IUserInfo>) {
      this.userInfo = userInfo
    }
  }
})
