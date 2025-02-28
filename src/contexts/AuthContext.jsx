// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react'
import { loginAPI } from '../apis/authAPI'

const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (userData) => {
    const res = await loginAPI(userData)
    localStorage.setItem('user', JSON.stringify(res.data.accountResponse))
    localStorage.setItem('access_token', res.data.jwtToken)
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)