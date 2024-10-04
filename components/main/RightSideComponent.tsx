"use client";
import React, { useEffect, useState } from "react";
import RightSidebar from "./RightSidebar";

const RightSideComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Adjust threshold as needed (1024px is lg breakpoint)
  };

  useEffect(() => {
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Check on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className={`w-full bg-gray-100 lg:h-full ${isMobile ? "block" : "hidden lg:block"}`}>
      <RightSidebar isVisible={!isMobile} />
    </div>
  );
};

export default RightSideComponent;
