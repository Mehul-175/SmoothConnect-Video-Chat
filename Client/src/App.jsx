/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
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
  return (
    <div className='h-screen' data-theme="luxury"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding" element={<Onboading />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <Toaster />
    </div>
  )
}

export default App
