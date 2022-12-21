import { useState, useEffect } from "react"
import axios from "axios"

function useLogin() {
  const getUser = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.get('/user', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      setStatus([true, false])
    } catch (error) {
      setStatus([false, false])
    }
  }
  // 登录状态，加载状态
  const [status, setStatus] = useState([false, true])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      getUser()
    } else {
      setStatus([false, false])
    }
  }, [])
  return status
}

export default useLogin