import { Badge } from "./ui/badge";
import { Calendar, CheckCircle, Tag, User } from "lucide-react"; // Icons from lucide-react
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface RightSidebarProps {
  isVisible: boolean;
}

export default function RightSidebar({ isVisible }: RightSidebarProps) {
  if (!isVisible) return null; // Return null if not visible

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
      <div className="mb-4 mt-3">
        <h2 className="text-lg font-bold mb-2 ">Main info</h2>
        <div className="flex items-center text-gray-500 mb-1 p-1">
          <User className="h-5 w-5 mr-2" />
          <span className="text-gray-500 ">Creator</span>
          <span className="ml-auto text-gray-500 font-semibold">Andrew M.</span>
        </div>
        <div className="flex items-center mb-1 p-1 text-gray-500">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-gray-500">Date of creation</span>
          <span className="text-gray-500 ml-auto">28 May</span>
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

      {/* Linked Threads */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Linked threads</h2>
        <div className="mb-2 text-gray-500">
          <Badge className="px-2 py-1 text-gray-400 bg-gray-100"># Front-end</Badge>
        </div>
        <div>
          <Badge className="px-2 py-1 text-gray-400 bg-gray-100">
            # UI-kit design standards
          </Badge>
        </div>
      </div>

      {/* Thread Activity */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Thread activity</h2>
        <div className="flex">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-2 mr-1 rounded-none ${
                i < 15 ? "bg-green-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Members</h2>
        <div className="space-y-2">
          {[
            { name: "Daniel Anderson", role: "Art director", badge: "Design" },
            { name: "Andrew Miller", role: "Product owner", badge: "Management" },
            { name: "William Johnson", role: "UX/UI designer", badge: "Design" },
            { name: "Emily Davis", role: "Front-end dev", badge: "Development" },
          ].map((member, index) => (
            <div key={index} className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-gray-400">{member.role}</span>
              </div>
              <Badge className="ml-auto bg-gray-700 text-white">{member.badge}</Badge>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
