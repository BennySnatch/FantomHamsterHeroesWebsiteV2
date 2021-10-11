import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  buyHams,
  buyWhitelistedHams,
  getOwnedMetas,
} from "../../../utils/functions/HamFunctions";
import CountdownTimer from "../../countdown";

function Mint() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { contextState, setContextState } = useContext(AppContext);

  const saleStats =
    Date.now() > 1633951800000 ? 2 : Date.now() > 1633948824000 ? 1 : 0;

  type Popup = {
    isLoading: boolean;
    message: string;
    isError: boolean;
    txHash: string;
    show: boolean;
  };

  async function handleMint() {
    console.log(Date.now());
    if (contextState.isFantom && !contextState.isPaused) {
      const popupState: Popup = {
        isLoading: true,
        isError: false,
        message: "",
        txHash: "",
        show: true,
      };
      setContextState({
        ...contextState,
        popupState,
      });
      if (saleStats == 1) {
        try {
          const txHash = await buyWhitelistedHams(
            contextState.hamContractSigner,
            contextState.price,
            buyAmount
          );
          const popupState: Popup = {
            isLoading: false,
            isError: false,
            message: "",
            txHash,
            show: true,
          };
          setContextState({
            ...contextState,
            popupState,
          });
        } catch (e: any) {
          const popupState: Popup = {
            isLoading: false,
            isError: true,
            message: e.message,
            txHash: "",
            show: true,
          };
          setContextState({
            ...contextState,
            popupState,
          });
        }
      } else {
        try {
          const txHash = await buyHams(
            contextState.hamContractSigner,
            contextState.price,
            buyAmount
          );
          const popupState: Popup = {
            isLoading: false,
            isError: false,
            message: "",
            txHash,
            show: true,
          };
          setContextState({
            ...contextState,
            popupState,
          });
        } catch (e: any) {
          const popupState: Popup = {
            isLoading: false,
            isError: true,
            message: e.message,
            txHash: "",
            show: true,
          };
          setContextState({
            ...contextState,
            popupState,
          });
        }
      }
    }
  }

  function increment() {
    if (saleStats == 1 ? buyAmount < 2 : buyAmount < 5) {
      setBuyAmount(buyAmount + 1);
    }
  }

  function decrement() {
    if (buyAmount > 1) {
      setBuyAmount(buyAmount - 1);
    }
  }

  return (
    <div className="flex flex-col relative items-center  w-full py-8 ">
      <h2 className="text-[30px] lg:text-7xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
        Mint A Hamster
      </h2>

      <CountdownTimer />

      <div className="flex flex-col items-center">
        <div className="flex ">
          <div className="flex items-center justify-center mr-8 text-8xl text-center font-bold text-blackish w-40">
            {buyAmount}
          </div>

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
        </div>

        {/* Mint Button */}
        <div
          className="flex items-center justify-center bg-blackish rounded-md py-2 mt-8 px-12 cursor-pointer"
          onClick={handleMint}
        >
          {saleStats == 1 && (
            <span className="text-4xl text-beige uppercase tracking-[2px] ">
              Mint Whitelist
            </span>
          )}
          {saleStats == 2 && (
            <span className="text-4xl text-beige uppercase tracking-[12px] mx-4 ">
              Mint
            </span>
          )}
        </div>

        {/* Amount left */}
        <div className="flex flex-col lg:flex-row items-center justify-center  mt-4 py-4  px-8">
          <span className="text-3xl lg:mr-8">
            {contextState.currentSupply}/3333
          </span>
          <span className="text-xl uppercase">Hamsters Minted</span>
        </div>
      </div>
    </div>
  );
}

export default Mint;
