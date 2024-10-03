// Icons from lucide-react
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getCurrentUser } from "@/app/api/auth/session";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import Profile from "../Profile";
import SearchComponent from "../SearchComponent";
import { Button } from "../ui/button";
import CreateGroupPopup from "../CreateGroupPopup"; // Import CreateGroupPopup component
import GroupList from "../GroupList";

interface RightSidebarProps {
  isVisible: boolean;
}

interface Profile {
  data: Profile | PromiseLike<Profile | null> | null;
  name: string;
  designation?: string;
  email: string;
  id: string;
  profile_image: string;
}

async function fetchProfile(token: string): Promise<Profile | null> {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: Profile = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default function RightSidebar({ isVisible }: RightSidebarProps) {
  const router = useRouter();
  const { setLoginUser } = useChat();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state

  useEffect(() => {
    const getUserProfile = async () => {
      const session = await getCurrentUser();
      const token = session?.accessToken;

      if (!token) {
        alert("Please login");
        router.push("/login");
        return;
      }

      const userProfile = await fetchProfile(token);

      if (!userProfile) {
        alert("Please login");
        router.push("/login");
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = existingUsers.some(
        (user: { id: string }) => user.id === userProfile.id
      );

      if (!userExists) {
        const updatedUsers = [...existingUsers, userProfile];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      setLoginUser(userProfile);
      setLoading(false);
    };

    getUserProfile();
  }, [router, setLoginUser]);

  const handleCreateGroupClick = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  if (!isVisible) return null;
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <aside className="lg:w-72 w-full p-4 bg-gray-100 text-black border-l border-gray-300 h-screen overflow-y-auto">
      {/* Menubar */}
      <Menubar className="mb-4">
        <MenubarMenu>
          <MenubarTrigger className="text-black">Info</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black">Pins</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black">Files</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black">Links</MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      {/* Main Info */}
      <Profile />

      {/* Members Section */}
      <div className="mb-4 border-t-2 ">
        <div className="flex items-center justify-between my-2">
          <h2 className="text-lg font-bold">Members</h2>
          <Button
            variant="secondary"
            className="bg-gray-800 text-white hover:bg-gray-600 hover:text-black text-sm px-2"
            onClick={handleCreateGroupClick} // Trigger popup
          >
            Create Group
          </Button>
        </div>
        <SearchComponent />
        <div className=" my-3 ">
          <h2 className="text-lg font-bold">Group List</h2>
          <GroupList/>
        </div>
      </div>

      {/* Create Group Popup */}
      <CreateGroupPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </aside>
  );
}
