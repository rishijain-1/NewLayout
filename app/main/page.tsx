import Sidebar from "@/components/main/Sidebar";
import RightSideComponent from "@/components/main/RightSideComponent";
import ChatBox from "@/components/ChatBox";

export default function Main() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Sidebar - Visible on larger screens */}
      <div className="hidden lg:block w-1/5 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Visible on smaller screens */}
      <div className="lg:hidden w-full bg-gray-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto w-full lg:w-3/6 bg-white">
        <ChatBox />
      </main>

      {/* Right Sidebar - Visible on mobile and larger screens */}
      <div className="w-full lg:w-1/5 bg-gray-100 lg:h-full">
        <RightSideComponent />
      </div>
    </div>
  );
}
