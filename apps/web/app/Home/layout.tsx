// app/home/layout.tsx

import Spline from "@splinetool/react-spline/next";
import ConnectWallet from "../components/connectWallet";
import Sidebar from "../components/Sidebar";
import ClientToastContainer from "../components/ClientToastContainer";

// In your JSX, near the root level:

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = "John Doe"; // Replace with actual user data

  return (
    <div className="flex h-screen bg-gray-900 text-white relative">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/Jib1Qow0Z1vVdo9F/scene.splinecode" />
      </div>
      {/* Sidebar */}
      <Sidebar username={username} />

      {/* Main content */}
      <div className="flex-1 p-10 overflow-y-auto z-10 relative">
        <ConnectWallet />
        {children}
      </div>
      <ClientToastContainer />
    </div>
  );
}
