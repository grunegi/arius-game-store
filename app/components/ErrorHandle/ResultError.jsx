"use client";

import { useEffect } from "react";
import ErrorDisplay from "./ErrorDisplay";

export default function ResultError({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <ErrorDisplay 
      type="no-results" 
      showRetryButton={true} 
      onRetry={() => reset()}
    />
  );
}