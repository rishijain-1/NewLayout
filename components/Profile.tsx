import { useChat } from '@/context/ChatContext';
import { Badge, Calendar, CheckCircle, Tag, User } from 'lucide-react'
import React from 'react'

const Profile = () => {
    const { loginUser } = useChat();
  return (
    <div className="mb-4 mt-3">
        <h2 className="text-lg font-bold mb-2 ">Main info</h2>
        <div className="flex items-center text-gray-500 mb-1 p-1">
          <User className="h-5 w-5 mr-2" />
          <span className="text-gray-500 ">Creator</span>
          <span className="ml-auto text-gray-500 font-semibold">{loginUser?.name}</span>
        </div>
        <div className="flex items-center mb-1 p-1 text-gray-500">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-gray-500">Designation</span>
          <span className="text-gray-500 ml-auto">{loginUser?.designation}</span>
        </div>
        <div className="flex items-center mb-1 p-1 text-gray-500">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-gray-500">Status</span>
          <Badge className="ml-auto bg-green-500 text-white">Active</Badge>
        </div>
        <div className="flex items-center mb-1 p-1 text-gray-500">
          <Tag className="h-5 w-5 mr-2" />
          <span className="text-gray-500">Tags</span>
          <span className="ml-auto text-gray-500">13</span>
        </div>
        <div className="flex items-center text-gray-500 mb-1 p-1">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-gray-500">Tasks</span>
          <span className="ml-auto text-gray-500">4</span>
        </div>
      </div>
  )
}

export default Profile