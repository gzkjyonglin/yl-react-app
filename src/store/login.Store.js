import { makeAutoObservable } from "mobx"
import { http, getToken, setToken, clearToken } from "@/utils"

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile, code
    }).then((res) => {
      // console.log(res)
      if (res.message === "OK") {
        this.token = res.data.token
        setToken(res.data.token)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  loginOut = () => {
    this.token = ''
    clearToken()
  }
}
export default LoginStore