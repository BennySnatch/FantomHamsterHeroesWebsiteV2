import { ethers } from "ethers";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { STAKING_ABI, STAKING_ADDRESS } from "../utils/contracts/HamContract";
import { getRank, getScore } from "../utils/functions/HamFunctions";
import { getTimer, unstakeHams } from "../utils/functions/StakingFunctions";
import { trimImageURI } from "../utils/functions/utils";
import { finalmeta } from "../utils/traitsfinal";
declare let window: any;

function getProvider() {
  if (!window.ethereum) {
    window.alert("You must install MetaMask to use this website");
    return;
  }
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  return provider;
}

function HamCard({ ham, update }: { ham: number; update: Function }) {
  const [timer, setTimer] = useState(0);

  fetchTimer(ham);

  async function fetchTimer(id: any) {
    let provider = getProvider();
    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      provider
    );
    const time = await getTimer(stakingContract, id);
    console.log(timer);
    setTimer(time);
  }

  async function unstake(ids: any) {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    let signer = provider.getSigner();
    const stakingContractSigner = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      signer
    );

    const tx = await unstakeHams(stakingContractSigner, ids);
    update();
    console.log(tx);
  }

  return (
    <div className="bg-blackish relative rounded p-2 max-w-xs">
      <div className=" flex items-center w-full  py-1 text-beige text-center text-3xl  ">
        <span className="text-2xl ">Rank </span>
        <span className="text-2xl ml-2">#{getRank(ham)}</span>
      </div>
      <div className="min-h-[150px]">
        {ham < 11 && (
          <img
            src={trimImageURI(finalmeta[ham].image) + `.gif`}
            alt={`Hamster Heroes #${ham}`}
            className="place"
          />
        )}
        {ham >= 11 && (
          <img
            src={trimImageURI(finalmeta[ham].image) + `.jpg`}
            alt={`Hamster Heroes #${ham}`}
            className="place"
          />
        )}
      </div>

      <div className="flex w-full justify-between px-2 py-4">
        <div className="flex  justify-center flex-col">
          <div className=" text-beige text-lg">
            Hamster Heroes
            <span className=" text-lg"> #{ham}</span>
          </div>

          <div className=" text-beige text-xl">
            Score:
            <span className="ml-4 text-2xl">{getScore(ham)}</span>
          </div>
        </div>
      </div>
      <div>
        <Countdown date={timer * 1000} />
      </div>
      <div
        onClick={() => unstake([ham])}
        className="flex items-center justify-center text-xl px-4 py -2 bg-beige rounded hover:contrast-150 cursor-pointer select-none"
      >
        UnStake
      </div>
    </div>
  );
}

export default HamCard;
