import {
  CircleCheck,
  TriangleAlert,
  CircleAlert,
  Info,
} from "lucide-react";

export default function Message({
  type = "info",
  title,
  message,
}) {
  const styles = {
    success: {
      icon: <CircleCheck size={20} />,
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      text: "text-green-400",
    },

    error: {
      icon: <TriangleAlert size={20} />,
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },

    warning: {
      icon: <CircleAlert size={20} />,
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },

    info: {
      icon: <Info size={20} />,
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`mt-3 flex w-full items-start gap-3 rounded-xl border ${style.border} ${style.bg} px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-3`}
    >
      <div className={`shrink-0 ${style.text}`}>
        {style.icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`font-semibold text-sm sm:text-base ${style.text}`}>
          {title}
        </p>

        <p className="mt-1 wrap-break-word text-xs leading-5 text-zinc-300 sm:text-sm sm:leading-6">
          {message}
        </p>
      </div>
    </div>
  );
}
