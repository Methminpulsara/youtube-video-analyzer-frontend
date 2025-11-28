export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 opacity-50" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
      </div>
      <div className="text-gray-400 font-medium">Processing your video...</div>
      <div className="text-sm text-gray-600">This may take a few moments</div>
    </div>
  );
}