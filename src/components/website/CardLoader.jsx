import React from "react";

function CardLoader() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <div className="w-full h-full bg-slate-300 animate-pulse" />
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 bg-slate-400 rounded-full animate-pulse" />
        </div>
        <div className="absolute top-2 left-2 bg-slate-400 text-transparent px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          OFF
        </div>
      </div>
      <div className="p-4">
        <div className="h-14 bg-slate-300 rounded mb-2 animate-pulse" />
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="w-24 h-6 bg-slate-400 rounded animate-pulse" />
            <div className="w-16 h-4 bg-slate-300 rounded mt-1 animate-pulse" />
          </div>
        </div>
        <div className="w-full h-10 bg-slate-400 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default CardLoader;
