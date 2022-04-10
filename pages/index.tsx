import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  community_wallet,
  getBalance,
  hashToLink,
  metadataFromUri,
  presaleTime,
  saleTime,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Gallery from "../components/pages/home/Gallery";
import Footer from "../components/pages/home/Footer";
import { HAM_ABI, HAM_ADDRESS } from "../utils/contracts/HamContract";

import {
  getPresale,
  getPrice,
  getSale,
  getSupply,
  saleStatus,
} from "../utils/functions/HamFunctions";
import Roadmap from "../components/pages/home/Roadmap";
import Socials from "../components/pages/home/Socials";
import Marquee from "../components/pages/home/Marquee";
import Ham from "../components/pages/home/Ham";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);

  return (
    <div className="font-naomishand bg-beige items-center justify-center flex max-w-[100vw] ">
      <Head>
        <title>Fantom Hamster Heroes</title>
        <meta
          name="description"
          content="Hamster Heroes are a collection of randomly generated NFTs on Fantom"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center max-w-screen-xl ">
        <nav className="absolute top-0 h-20 flex flex-row items-left justify-between lg:justify-left  w-full px-4 lg:px-20 py-12 ">
          <Link href="/">
            <div className="flex items-center justify-between lg:justify-end lg:w-full">
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Home
                </span>
              </Link>
            </div>
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Roadmap
                </span>
              </Link>
            </div>
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Collections
                </span>
              </Link>
            </div>
            </div>
          </Link>          
            <Socials />
        </nav>
        <Hero />
        <Ham />
        <Mint balance={contextState.balance} />
        <Marquee />
        <Gallery />
        <Roadmap />
        <Footer />

        <Popup>
          <div className=" flex rounded-2xl flex-col items-center justify-evenly text-white text-xl py-12 px-4 space-y-4 w-full max-w-xl bg-blackish ">
            <div className=" flex flex-col items-center justify-center">
              {contextState.popupState.isLoading && (
                <div className="flex items-center justify-center flex-col">
                  <img
                    src="/assets/images/loading.png"
                    className="w-40 h-40 mb-8 animate-bounce"
                    alt=""
                  />
                  <span className="text-3xl font-bold text-beige">
                    Minting Hamster...
                  </span>
                </div>
              )}
              {contextState.popupState.isError && (
                <div className="flex items-center justify-center flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-40 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-4xl text-red-500 mb-6">ERROR</span>
                  <span className="text-lg font-bold text-beige text-center">
                    {contextState.popupState.message}
                  </span>
                </div>
              )}
              {!contextState.popupState.isLoading &&
                !contextState.popupState.isError && (
                  <div className="flex items-center justify-center flex-col">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-40 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-4xl font-bold text-green-600 text-center">
                      Mint Succesfull
                    </span>
                    <div className="flex text-beige mt-4 hover:text-gray-600">
                      <a
                        href={hashToLink(contextState.popupState.txHash)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {trimHash(contextState.popupState.txHash)}
                      </a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </Popup>
      </main>
    </div>
  );
};

export default Home;
