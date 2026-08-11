"use client";

import { useOnlineStatus } from "@/app/hooks/useOnlineStatus";
import ErrorDisplay from "./ErrorDisplay";

export default function OnlineWrapper({ children }) {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <ErrorDisplay
        type="offline"
        showHomeButton={false}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <>{children}</>;
}
