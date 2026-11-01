import React, { createContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

export const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('azureToken')
    const storedUser = localStorage.getItem('azureUser')
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('azureToken')
        localStorage.removeItem('azureUser')
      }
    }
    setLoading(false)
  }, [])

  async function signup(email, password) {
    try {
      const data = await authAPI.signup(email, password)
      localStorage.setItem('azureToken', data.token)
      localStorage.setItem('azureUser', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        errorType: err.errorType || 'SERVER_ERROR',
        error: err.message || 'Something went wrong. Please try again.',
      }
    }
  }

  async function login(email, password) {
    try {
      const data = await authAPI.login(email, password)
      localStorage.setItem('azureToken', data.token)
      localStorage.setItem('azureUser', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        errorType: err.errorType || 'SERVER_ERROR',
        error: err.message || 'Something went wrong. Please try again.',
      }
    }
  }

  function logout() {
    localStorage.removeItem('azureToken')
    localStorage.removeItem('azureUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signup, user, logout, login, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider