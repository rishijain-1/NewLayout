import React from 'react'

const LogoHeader = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-indigo-500 text-3xl font-bold hover:text-indigo-400 transition-colors">
          GetChat
        </div>
      </div>
    </nav>
  )
}

export default LogoHeader