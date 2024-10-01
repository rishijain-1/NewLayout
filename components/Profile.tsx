import { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { Badge, Calendar, CheckCircle, Tag, User } from 'lucide-react';
import { getCurrentUser } from '@/app/api/auth/session';
import Image from 'next/image'; 

const Profile = () => {
  const { loginUser } = useChat();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (loginUser?.profile_image) {
      setProfilePic(loginUser.profile_image);
    } else {
      setProfilePic('/default-profile.png');
    }
  }, [loginUser]);

  // Handle image selection and upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const postImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profile_image', selectedFile);

      const token = await getCurrentUser().then((session) => session?.accessToken);

      const response = await fetch('/api/profileImage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message); 
      } else {
        console.log(response.body);
      }
    }
  };

  const handleProfileClick = () => {
    const fileInput = document.getElementById('profile-input');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleFileUpload = async () => {
    if (selectedFile) {
      await postImage();
    }
  };

  return (
    <div className="mb-4 mt-3">
      <h2 className="text-lg font-bold mb-2">Main info</h2>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-4">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={profilePic ?? '/default-profile.png'} 
            alt="Profile"
            width={96} 
            height={96}
            className="object-cover w-full h-full"
          />
        </div>

        <input
          id="profile-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <p className="text-gray-600 mt-2">Click to change your profile picture</p>

        {/* Upload Button */}
        {selectedFile && (
          <button
            onClick={handleFileUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload Profile Picture
          </button>
        )}
      </div>

      {/* User Information */}
      <div className="flex items-center text-gray-500 mb-1 p-1">
        <User className="h-5 w-5 mr-2" />
        <span className="text-gray-500">Creator</span>
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
  );
};

export default Profile;
