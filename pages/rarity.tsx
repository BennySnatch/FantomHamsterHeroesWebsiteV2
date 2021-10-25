import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
import Select from "react-select";

import { trimImageURI } from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Footer from "../components/pages/home/Footer";

import {
  getId,
  getRank,
  getRarity,
  getScore,
} from "../utils/functions/HamFunctions";
import Socials from "../components/pages/home/Socials";
import { finalmeta } from "../utils/traitsfinal";
import { rarityRanked } from "../utils/rarity";
import {
  backgroundOptions,
  backOptions,
  eyeOptions,
  hatOptions,
  skinOptions,
  weaponOptions,
} from "../utils/traits";

type Filters = {
  background: string;
  back: string;
  hat: string;
  weapon: string;
  eye: string;
};

const Home: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [rank, setRank] = useState("");

  function increment() {
    if (pageIndex < 112) {
      setPageIndex(pageIndex + 1);
    }
  }

  function decrement() {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  }

  const [filters, setFilters] = useState<Filters>({
    hat: "",
    back: "",
    background: "",
    weapon: "",
    eye: "",
  });
  const [traits, setTraits] = useState(["", "", "", "", "", "", ""]);

  const [matching, setMatching] = useState<number[]>([]);

  const start = (pageIndex - 1) * 30;

  function checkAttributes(id: any) {
    const metaI = finalmeta[id];
    let matches = false;
    let counts = 0;
    let exact = 0;
    for (let i = 0; i < 7; i++) {
      if (traits[i] != "") {
        counts += 1;
        if (traits[i] == metaI.attributes[i].value) {
          matches = true;
          exact += 1;
          // console.log("Matches", traits[i]);
        } else {
          matches = false;
          // console.log("Don't Matches", traits[i]);
        }
      }
    }
    return counts == exact;
  }
  function filterByAttributes() {
    const matches: number[] = [];

    for (let i = 0; i < 3333; i++) {
      if (checkAttributes(i)) {
        matches.push(i);
      }
    }
    console.log(matches);
    setMatching(matches);
    // console.log("This one is", checkAttributes(12));
  }

  var allHams = [];
  var matchingHams = [];
  for (var ham = start + 1; ham < start + 31 && ham <= 3333; ham++) {
    allHams.push(
      <div className="bg-blackish relative rounded p-2 max-w-xs" key={ham}>
        <div className=" flex items-center w-full  py-1 text-beige text-center text-3xl  ">
          <span className="text-2xl ">Rank </span>
          <span className="text-2xl ml-2">#{ham}</span>
        </div>
        <div className="min-h-[150px]">
          {ham <= 11 && (
            <img
              src={trimImageURI(finalmeta[getId(ham)].image) + `.gif`}
              alt={`Hamster Heroes #${getId(ham)}`}
              className="place"
            />
          )}
          {ham > 11 && (
            <img
              src={trimImageURI(finalmeta[getId(ham)].image) + `.jpg`}
              alt={`Hamster Heroes #${getId(ham)}`}
              className="place"
            />
          )}
        </div>

        <div className="flex w-full justify-between px-2 py-4">
          <div className="flex  justify-center flex-col">
            <div className=" text-beige text-lg">
              Hamster Heroes
              <span className=" text-lg"> #{getId(ham)}</span>
            </div>

            <div className=" text-beige text-xl">
              Score:
              <span className="ml-4 text-2xl">{getScore(getId(ham))}</span>
            </div>
          </div>
        </div>
      </div>
    );
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

            <Socials />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col flex-1 mt-24 px-4">
          <div
            className="text-4xl font-bold text-blackish text-center mb-8"
            onClick={filterByAttributes}
          >
            Hamster Heroes Rarity
          </div>

          <div className="flex  ">
            {/* filters */}
            <div className="flex flex-col w-[420px] py-20 pr-8 space-y-6">
              <span className="text-3xl text-blackish mb-4">Filters</span>
              {/* body */}
              <div>
                <span className="text-sm text-blackish mb-4">Background</span>
                <Select
                  options={backgroundOptions}
                  onChange={(value) => {
                    let t = traits;
                    t[0] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
              {/* hat */}
              <div>
                <span className="text-sm text-blackish mb-4">Hat</span>
                <Select
                  options={hatOptions}
                  onChange={(value) => {
                    let t = traits;
                    t[1] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
              {/* back */}
              <div>
                <span className="text-sm text-blackish mb-4">Back</span>
                <Select
                  options={backOptions}
                  // onChange={(value) =>
                  //   setFilters({
                  //     ...filters,
                  //     back: value ? value.label : "",
                  //   })
                  // }
                  onChange={(value) => {
                    let t = traits;
                    t[2] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
              {/* Eyes */}
              <div>
                <span className="text-sm text-blackish mb-4">Eyes</span>
                <Select
                  options={eyeOptions}
                  onChange={(value) => {
                    let t = traits;
                    t[3] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
              {/* Weapon */}
              <div>
                <span className="text-sm text-blackish mb-4">Weapon</span>
                <Select
                  options={weaponOptions}
                  onChange={(value) => {
                    let t = traits;
                    t[4] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
              {/* Skin */}
              <div>
                <span className="text-sm text-blackish mb-4">Skin</span>
                <Select
                  options={skinOptions}
                  onChange={(value) => {
                    let t = traits;
                    t[6] = value ? value.label : "";
                    setTraits([...t]);
                  }}
                />
              </div>
            </div>

            {/* filter end */}
            <div>
              {/* Pagination Indiactor */}
              <div className="flex items-center justify-between select-none py-8">
                <div>
                  {pageIndex > 1 && (
                    <div
                      className="px-6 py-4 text-2xl bg-blackish text-beige cursor-pointer rounded"
                      onClick={() => decrement()}
                    >
                      Prev
                    </div>
                  )}
                </div>
                {pageIndex < 112 && (
                  <div
                    className="px-6 py-4 text-2xl bg-blackish text-beige cursor-pointer rounded"
                    onClick={() => increment()}
                  >
                    Next
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 place-items-center gap-8">
                {matching.length == 0 ? allHams : <div></div>}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
