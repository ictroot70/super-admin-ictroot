'use client'

import { ToastContainer } from 'react-toastify'

export const ToastProvider = () => {
  return (
    <ToastContainer
      position={'bottom-right'}
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={'dark'}
    />
  )
}
