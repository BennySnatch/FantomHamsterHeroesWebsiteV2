import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { trimAddress, trimImageURI } from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Footer from "../components/pages/home/Footer";
import {
  HAM_ABI,
  HAM_ADDRESS,
  STAKING_ABI,
  STAKING_ADDRESS,
} from "../utils/contracts/HamContract";

import {
  getOwnedIDs,
  getRank,
  getRarity,
  getScore,
} from "../utils/functions/HamFunctions";
import Socials from "../components/pages/home/Socials";
import { finalmeta } from "../utils/traitsfinal";
import {
  getStaked,
  stakeHams,
  unstakeHams,
} from "../utils/functions/StakingFunctions";
import HamCard from "../components/HamCard";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);
  const [myHams, setMyHams] = useState([]);
  const [myStaked, setMyStaked] = useState([]);

  useEffect(() => {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    connectWallet();
    window.ethereum.on("accountsChanged", () => {
      connectWallet();
    });

    window.ethereum.on("chainChanged", () => {
      document.location.reload();
    });
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();
    const hamContract = new ethers.Contract(HAM_ADDRESS, HAM_ABI, provider);
    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      provider
    );

    const hamContractSigner = new ethers.Contract(HAM_ADDRESS, HAM_ABI, signer);

    const addr = await signer.getAddress();

    const ownedIds = await getOwnedIDs(hamContract, addr);
    const staked = await getStaked(stakingContract, addr);

    setMyHams(ownedIds);
    setMyStaked(staked);

    setContextState({
      ...contextState,
      addr,
      isLoading: false,
      isConnected: true,
      hamContract,
      hamContractSigner,
    });
  }

  async function updateCounts() {
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let signer = provider.getSigner();
    const hamContract = new ethers.Contract(HAM_ADDRESS, HAM_ABI, provider);
    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      provider
    );
    const addr = await signer.getAddress();
    const ownedIds = await getOwnedIDs(hamContract, addr);
    const staked = await getStaked(stakingContract, addr);
    setMyHams(ownedIds);
    setMyStaked(staked);
  }

  async function stake(ids: any) {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();
    const stakingContractSigner = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      signer
    );

    const tx = await stakeHams(stakingContractSigner, ids);
    updateCounts();
    console.log(tx);
  }
  async function unstake(ids: any) {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();
    const stakingContractSigner = new ethers.Contract(
      STAKING_ADDRESS,
      STAKING_ABI,
      signer
    );

    const tx = await unstakeHams(stakingContractSigner, ids);
    console.log(tx);
    updateCounts();
  }

  return (
    <div className="font-skranji bg-beige items-center justify-center flex max-w-[100vw] ">
      <Head>
        <title>My Hamsters </title>
        <meta name="description" content="View all your Hamsters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center max-w-screen-xl ">
        <nav className="absolute top-0 h-20 flex flex-row items-center justify-between lg:justify-center  w-full px-4 lg:px-20 py-12 ">
          <Link href="/">
            <div className="items-center justify-center cursor-pointer">
              <img
                className="h-12 hidden lg:flex"
                src="/assets/images/logo.png"
                alt=""
              />
              <img
                className="h-16 lg:hidden"
                src="/assets/images/FantomHAM_LOGO.png"
                alt=""
              />
            </div>
          </Link>
          <div className="flex items-center justify-between lg:justify-end lg:w-full ">
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  HAM
                </span>
              </Link>
            </div>
            <div
              className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer"
              onClick={() => connectWallet()}
            >
              <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                {contextState.addr != ""
                  ? trimAddress(contextState.addr)
                  : "Connect"}
              </span>
            </div>

            <Socials />
          </div>
        </nav>
        <div className="flex flex-col flex-1 mt-24 px-4">
          <div className="text-4xl font-bold text-blackish text-center mb-8">
            My Hamster Heroes
          </div>
          {myHams.length == 0 && myStaked.length == 0 && (
            <div className="text-4xl flex items-center justify-center py-60 w-full">
              Oops! You don't own any Hamsters.
            </div>
          )}
          <div className="flex items-center justify-center mb-8">
            {myHams.length > 0 && (
              <div
                onClick={() => stake(myHams)}
                className="flex items-center justify-center text-xl px-4 py -2 bg-black text-beige w-40 py-2 rounded hover:contrast-150 cursor-pointer select-none"
              >
                Stake All
              </div>
            )}
            {myStaked.length > 0 && (
              <div
                onClick={() => unstake(myStaked)}
                className="flex items-center justify-center text-xl px-4 py -2 bg-black text-beige w-40 ml-8 py-2 rounded hover:contrast-150 cursor-pointer select-none"
              >
                UnStake All
              </div>
            )}
          </div>

          {myStaked.length > 0 && (
            <div className="flex flex-col  justify-center py-8">
              <div className="text-2xl font-bold text-blackish  mb-8">
                Staked Hamsters
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 place-items-center gap-8">
                {myStaked.map((ham: number, index) => (
                  <HamCard key={index} ham={ham} update={updateCounts} />
                ))}
              </div>
            </div>
          )}
          {myHams.length > 0 && (
            <div className="text-2xl font-bold text-blackish  mb-8">
              UnStaked Hamsters
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-5 place-items-center gap-8">
            {myHams.map((ham, index) => (
              <div
                className="bg-blackish relative rounded p-2 max-w-xs"
                key={index}
              >
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
                <div
                  onClick={() => stake([ham])}
                  className="flex items-center justify-center text-xl px-4 py -2 bg-beige rounded hover:contrast-150 cursor-pointer select-none"
                >
                  Stake
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
