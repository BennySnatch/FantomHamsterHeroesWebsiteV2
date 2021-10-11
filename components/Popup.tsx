import { AppContext } from "../context/AppContext";
import React, { useContext, useState } from "react";

export default function Popup({ children }: { children: any }) {
  type Popup = {
    isLoading: boolean;
    message: string;
    isError: boolean;
    txHash: string;
    show: boolean;
  };

  const { contextState, setContextState } = useContext(AppContext);
  function togglePop() {
    const popupState: Popup = {
      isLoading: false,
      isError: false,
      message: "",
      txHash: "",
      show: false,
    };
    setContextState({
      ...contextState,
      showPopup: false,
      popupState,
    });
  }
  return contextState.popupState.show ? (
    <div className=" flex items-center bg-black/30 h-full inset-0 z-30 w-full  justify-center fixed overflow-hidden px-4">
      <div className="flex items-center justify-center relative w-full flex-col">
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}
