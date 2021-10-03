import { AppContext } from "../context/AppContext";
import React, { useContext, useState } from "react";

export default function Popup({ children }: { children: any }) {
  const { contextState, setContextState } = useContext(AppContext);
  function togglePop() {
    setContextState({
      ...contextState,
      showPopup: false,
    });
  }
  return contextState.showPopup ? (
    <div className=" flex items-center bg-black/30 h-full inset-0 z-30 w-full  justify-center fixed overflow-hidden">
      <div className="relative ">
        {
          <div
            className="absolute right-4 top-4 border-2 rounded border-green-400 text-white leading-3 text-center p-1 font-bold cursor-pointer"
            onClick={() => togglePop()}
          >
            X
          </div>
        }
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}
