"use client";

import { useEffect } from "react";
import ErrorDisplay from "./ErrorDisplay";

export default function CategoryError({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <ErrorDisplay 
      type="empty-category" 
      showRetryButton={true} 
      onRetry={() => reset()}
    />
  );
}