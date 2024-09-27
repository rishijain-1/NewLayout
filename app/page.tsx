import Register from "@/components/auth/Register";

export default function Home() {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-t from-gray-800 to-blue-600">
     

      {/* Register Form */}
      <main className="w-full max-w-md bg-opacity backdrop-blur-md rounded-lg">
        
        <Register/>
      </main>
    </div>
  );
}
