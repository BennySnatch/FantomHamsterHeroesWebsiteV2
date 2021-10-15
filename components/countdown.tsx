import React, { useContext, useEffect } from "react";
import Countdown from "react-countdown";

import { AppContext } from "../context/AppContext";
import { getPresale, getSale } from "../utils/functions/HamFunctions";
import { presaleTime, saleTime } from "../utils/functions/utils";

function CountdownTimer({ time, type }: { time: number; type: string }) {
  const { contextState, setContextState } = useContext(AppContext);

  const Completionist = () => (
    <div>
      {/* {contextState.saleStats == 1 && (
        <span className="text-purple-500 text-4xl mb-4 font-semibold">
          {type} is Live
        </span>
      )} */}
    </div>
  );

  function countdownComplete() {
    const saleStats = contextState.saleStats + 1;
    setContextState({
      ...contextState,
      saleStats,
    });
    console.log(
      "completed",
      contextState.saleStats,
      Date.now(),
      presaleTime,
      saleTime
    );
  }

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
      return null;
    } else {
      // Render a countdown
      return (
        <div className="flex flex-col items-center justify-center py-24">
          <span className="text-5xl">{type} Starts In</span>

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
      {/* //1634392800000 */}
      <span className="text-blackish text-3xl mb-4 font-semibold">
        <Countdown
          date={time}
          renderer={renderer}
          onComplete={countdownComplete}
        />
      </span>
    </div>
  );
}

export default CountdownTimer;
