"use client";

import { ThreeDot } from "react-loading-indicators";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ThreeDot
        variant="bounce"
        color="#ede3ed"
        size="medium"
        text=""
        textColor=""
      />
      
    </div>
  );
}