/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Onboading from './pages/Onboading.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import Notifications from './pages/Notifications.jsx'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

const App = () => {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry: false
  })
  const authUser = authData?.user
  return (
    <div className='h-screen' data-theme="synthwave"> 
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to = "/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to = "/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to = "/" />  } />
          <Route path="/onboarding" element={authUser ? <Onboading /> : <Navigate to = "/login" />} />
          <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to = "/login" />} />
          <Route path="/call" element={authUser ? <CallPage /> : <Navigate to = "/login" />} />
          <Route path="/notifications" element={authUser ? <Notifications /> : <Navigate to = "/login" />} />
        </Routes>
        <Toaster />
    </div>
  )
}

export default App
