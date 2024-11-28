import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-muted text-gray-700">
      <Loader2 size={48} className="animate-spin text-greenPrimary mb-4" />
      <p className="text-lg font-medium">Fetching tour details...</p>
    </div>
  );
}

export default Loading;
