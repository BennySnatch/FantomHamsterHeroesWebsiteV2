import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { buyHams, getOwnedMetas } from "../../../utils/functions/HamFunctions";
import CountdownTimer from "../../countdown";

function Mint() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { contextState, setContextState } = useContext(AppContext);

  async function handleMint() {
    if (contextState.isFantom && !contextState.isPaused) {
      setIsMinting(true);

      const txHash = await buyHams(
        contextState.macawContractSigner,
        contextState.price,
        buyAmount
      );

      if (txHash) {
        setContextState({
          ...contextState,
          txHash,
          showPopup: true,
        });
      }
      setIsMinting(false);
    }
  }

  function increment() {
    setBuyAmount(buyAmount + 1);
  }
  function decrement() {
    if (buyAmount > 0) {
      setBuyAmount(buyAmount - 1);
    }
  }

  function handleInput(event: any) {
    let val = parseInt(event.target.value.replace(/\D/, buyAmount));
    setBuyAmount(val);
    if (isNaN(val) || isNaN(event.target.value)) {
      setBuyAmount(0);
    }
  }

  return (
    <div className="flex flex-col relative items-center  w-full py-8 ">
      <h2 className="text-[30px] lg:text-7xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
        Mint A Hamster
      </h2>

      {/* <div className="flex flex-col items-center py-12">
        <div className="text-5xl text-gray-200 font-bold mb-8">
          {700 - contextState.currentSupply}
        </div>
        <span className="text-3xl text-gray-400 uppercase tracking-widest font-semibold">
          Available
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-12 transform">
        <div className="flex items-center py-8">
          <span className="text-3xl text-white mr-6 ">You Pay:</span>
          <span className="text-green-500 font-bold text-5xl">
            {contextState.price * buyAmount} FTM{" "}
          </span>
        </div>
        <div
          onClick={() => handleMint()}
          className="px-24 py-2 bg-btext-blackish font-semibold text-gray-800 text-2xl mb-8 cursor-pointer"
        >
          {contextState.isPaused ? (
            <span className="">Live Soon</span>
          ) : (
            <span>Mint {buyAmount == 1 ? "a" : buyAmount} Macaw</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-4">
          <div
            onClick={() => setBuyAmount(1)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x1
          </div>
          <div
            onClick={() => setBuyAmount(5)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x5
          </div>
          <div
            onClick={() => setBuyAmount(10)}
            className="font-white bg-green-300 p-2 w-16 h-12 flex items-center justify-center font-semibold cursor-pointer text-gray-800 text-2xl"
          >
            x10
          </div>
        </div>
      </div> */}

      <CountdownTimer />

      <div className="flex flex-col items-center">
        {/* <h2 className="text-6xl text-purple-700 transform -skew-x-12 py-24">
          Comming Soon
        </h2> */}
        {/* <div className="flex ">
          <input
            className="appearance-none mb-4 mr-8 outline-none bg-transparent text-7xl text-center font-bold text-blackish w-40 border-b-2 border-blackish"
            type="text"
            value={buyAmount}
            onChange={(event) => handleInput(event)}
          />

          <div className="flex flex-col space-y-2">
            <div
              className="w-10 h-10  text-beige select-none bg-blackish hover:(text-white background-color[#0B193D]) text-4xl flex items-center justify-center mb-2 font-bold p-2 rounded-lg cursor-pointer"
              onClick={() => increment()}
            >
              +
            </div>
            <div
              className="w-10 h-10 text-beige select-none bg-blackish hover:(text-white background-color[#0B193D]) text-4xl flex items-center justify-center font-bold p-2 rounded-lg cursor-pointer"
              onClick={() => decrement()}
            >
              -
            </div>
          </div>
        </div> */}

        {/* Total */}

        {/* Mint Button */}
        {/* <div className="flex items-center justify-center bg-blackish rounded-md py-2 mt-8 px-24">
          <span className="text-4xl text-beige uppercase tracking-[16px]">
            Mint
          </span>
        </div> */}

        {/* Amount left */}
        {/* <div className="flex flex-col lg:flex-row items-center justify-center  mt-4 py-4  px-8">
          <span className="text-3xl lg:mr-8">10000/10000</span>
          <span className="text-xl uppercase">Hamsters Minted</span>
        </div> */}
      </div>
    </div>
  );
}

export default Mint;
