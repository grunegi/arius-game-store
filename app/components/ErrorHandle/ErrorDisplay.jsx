import { Ghost, ServerCrash, WifiOff, ArrowLeft, RefreshCw, FolderOpen, SearchX } from "lucide-react";

export default function ErrorDisplay({ 
  type = "404", 
  title, 
  message, 
  showHomeButton = true, 
  showRetryButton = false,
  onRetry 
}) {
  
  // Default configurations based on error type
  const errorConfig = {
    404: {
      icon: <Ghost className="h-24 w-24 text-purple-500 animate-pulse" />,
      defaultTitle: "Page Not Found! (404)",
      defaultMessage: "It seems this level hasn't been built yet or you entered the wrong URL. Return to base!",
    },
    500: {
      icon: <ServerCrash className="h-24 w-24 text-red-500" />,
      defaultTitle: "Server Error (500)",
      defaultMessage: "Our servers are currently under heavy load or the database is temporarily unresponsive. Please try again in a moment.",
    },
    offline: {
      icon: <WifiOff className="h-24 w-24 text-yellow-500" />,
      defaultTitle: "Connection Lost",
      defaultMessage: "It seems your connection to the outside world has been severed! Please check your internet connection.",
    },
     "no-results": {
      icon: <SearchX className="h-24 w-24 text-blue-500" />,
      defaultTitle: "No Results Found",
      defaultMessage: "We couldn't find any games matching your search. Try different keywords or browse our full collection!",
    },
    // ⬇️ نوع جدید برای دسته‌بندی خالی
    "empty-category": {
      icon: <FolderOpen className="h-24 w-24 text-orange-500" />,
      defaultTitle: "This Category is Empty",
      defaultMessage: "There are no games in this category yet. Check back later or explore other categories!",
    }
  };

  const config = errorConfig[type] || errorConfig["404"];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Gaming decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-80 w-80 rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>

      {/* Large Icon */}
      <div className="mb-6 rounded-full bg-zinc-900/50 p-6 ring-1 ring-zinc-800 backdrop-blur-sm">
        {config.icon}
      </div>

      {/* Texts */}
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        {title || config.defaultTitle}
      </h1>
      <p className="mb-8 max-w-md text-lg leading-relaxed text-zinc-400">
        {message || config.defaultMessage}
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {showRetryButton && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
          >
            <RefreshCw className="h-5 w-5" />
            Retry
          </button>
        )}
        
        {!showHomeButton && !showRetryButton && (
           <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}