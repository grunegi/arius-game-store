"use client";

import { useEffect } from "react";
import ErrorDisplay from "./components/ErrorHandle/ErrorDisplay";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <ErrorDisplay 
      type="500" 
      showRetryButton={true} 
      onRetry={() => reset()}
    />
  );
}