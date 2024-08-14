import React from "react";

function CardLoader() {
  return (
    <main className="p-3 bg-violet-300 rounded-lg w-[300px] h-[400px] ">
      <section className="flex flex-col items-start gap-2 bg-violet-200 p-3 rounded-lg relative h-full ">
        <div className=" absolute top-4 right-4 z-20 animate-pulse bg-slate-400 "></div>
        <div className=" w-full h-[80%] rounded-md bg-slate-400 animate-pulse "></div>

        <div className="px-3 w-full">
          <div className="w-full  h-4 animate-pulse bg-slate-400 "></div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg h-[14px] w-[16px] animate-pulse bg-slate-400 "></p>
              <p className="h-3 w-[15px] animate-pulse bg-slate-400 "></p>
            </div>
            <span className="bg-slate-400  px-2 py-1 rounded-md animate-pulse"></span>
          </div>
        </div>
        <div className=" py-2 px-4 bg-slate-400 rounded-md w-full  font-bold  "></div>
      </section>
    </main>
  );
}

export default CardLoader;
