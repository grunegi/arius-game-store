"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function StatusPopup({ status, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status?.type) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!status?.type || !isVisible) return null;

  const isSuccess = status.type === "success";

  return createPortal(
    <div
      className="
        fixed
        top-4 right-4
        z-9999
        w-[calc(100%-2rem)]
        max-w-md
        sm:top-6 sm:right-6 sm:w-auto
        animate-slide-in
      "
    >
      <div
        className={`
          flex items-center gap-3
          rounded-2xl
          border
          px-4 py-3 sm:px-5 sm:py-4
          shadow-2xl
          backdrop-blur-sm

          ${
            isSuccess
              ? "border-green-500/30 bg-zinc-900/95 shadow-green-500/10"
              : "border-red-500/30 bg-zinc-900/95 shadow-red-500/10"
          }
        `}
      >
        {/* Icon */}
        <div
          className={`
            flex
            h-10 w-10
            shrink-0
            items-center justify-center
            rounded-full
            ${isSuccess ? "bg-green-500/20" : "bg-red-500/20"}
          `}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          ) : (
            <XCircle className="h-6 w-6 text-red-400" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">
            {status.title || (isSuccess ? "Success!" : "Failed!")}
          </p>

          <p className="mt-0.5 text-sm leading-5 text-zinc-400">
            {status.message ||
              (isSuccess
                ? "Operation completed successfully."
                : "Something went wrong. Please try again.")}
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="
            ml-auto
            shrink-0
            rounded-lg
            p-1.5
            text-zinc-500
            transition
            hover:bg-zinc-800
            hover:text-white
          "
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body
  );
}