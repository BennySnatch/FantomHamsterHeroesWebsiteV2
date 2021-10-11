import React, { useContext } from "react";
import Countdown from "react-countdown";

import { AppContext } from "../context/AppContext";

function CountdownTimer() {
  const { contextState, setContextState } = useContext(AppContext);

  const Completionist = () => (
    <span className="text-purple-700 text-4xl mb-4 font-semibold">
      {contextState.isPaused
        ? "Sale is not live"
        : contextState.currentSupply == 700
        ? "The sale is over"
        : "Sale is Live"}
    </span>
  );

  // Renderer callback with condition
  const renderer = ({
    hours,
    minutes,
    seconds,
    days,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="flex flex-col items-center justify-center py-24">
          <span className="text-5xl">Presale Starts In</span>

          <div className="flex flex-col lg:flex-row items-center justify-center ">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl lg:text-7xl tracking-widest">
                  {days}
                </span>
                <span className="text-2xl lg:text-4xl tracking-[12px] uppercase">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl lg:text-7xl tracking-widest">
                  {hours > 9 ? hours : "0" + hours}
                </span>
                <span className="text-2xl lg:text-4xl tracking-[12px] uppercase">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl lg:text-7xl tracking-widest">
                  {minutes > 9 ? minutes : "0" + minutes}
                </span>
                <span className="text-2xl lg:text-4xl tracking-[12px] uppercase">
                  Minutes
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl lg:text-7xl tracking-widest">
                  {seconds > 9 ? seconds : "0" + seconds}
                </span>
                <span className="text-2xl lg:text-4xl tracking-[12px] uppercase">
                  Seconds
                </span>
              </div>
            </div>
            {/* <span>
            {days}:{hours}h:{minutes}m:{seconds}s
          </span> */}
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <span className="text-blackish text-3xl mb-4 font-semibold">
        <Countdown date={1634392800000} renderer={renderer} />
      </span>
    </div>
  );
}

export default CountdownTimer;
