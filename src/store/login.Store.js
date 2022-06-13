import { makeAutoObservable } from "mobx"
import { http, getToken, setToken, clearToken } from "@/utils"

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile, code
    })
    this.token = res.data.token
    setToken(res.data.token)
  }
  loginOut = () => {
    this.token = ''
    clearToken()
  }
}
export default LoginStore