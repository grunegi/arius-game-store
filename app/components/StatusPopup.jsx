"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function StatusPopup({ status, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status?.type) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!status?.type || !isVisible) return null;

  const isSuccess = status.type === "success";

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-in">
      <div
        className={`
          flex items-center gap-3 rounded-2xl border px-5 py-4 
          shadow-2xl backdrop-blur-sm
          ${isSuccess
            ? "border-green-500/30 bg-zinc-900 shadow-green-500/10"
            : "border-red-500/30 bg-zinc-900 shadow-red-500/10"
          }
        `}
      >
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-full
            ${isSuccess ? "bg-green-500/20" : "bg-red-500/20"}
          `}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          ) : (
            <XCircle className="h-6 w-6 text-red-400" />
          )}
        </div>

        <div>
          <p className="font-semibold text-white">
            {status.title || (isSuccess ? "Success!" : "Failed!")}
          </p>
          <p className="text-sm text-zinc-400">
            {status.message ||
              (isSuccess
                ? "Operation completed successfully."
                : "Something went wrong. Please try again.")}
          </p>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-2 rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}