import { ethers } from "ethers";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Meta = {
  name: string;
  description: string;
  image: string;
  id: string | number;
};
type Popup = {
  isLoading: boolean;
  message: string;
  isError: boolean;
  txHash: string;
  show: boolean;
};

type Context = {
  isLoading: boolean;
  isFantom: boolean;
  balance: string;
  showPopup: boolean;
  isPaused: boolean;
  saleStats: number;
  addr: string;
  price: any;
  currentSupply: number;
  presaleStart: number;
  saleStart: number;
  isConnected: boolean;
  popupState: Popup;
  metas: any;
  hamContract: any;
  hamContractSigner: any;
  txHash: string;
};

const initialContext = {
  contextState: {
    isLoading: false,
    isFantom: true,
    showPopup: false,
    isPaused: true,
    saleStats: 0,
    addr: "",
    price: 0,
    balance: "0",
    currentSupply: 0,
    presaleStart: 0,
    saleStart: 0,
    isConnected: false,
    popupState: {
      isLoading: true,
      txHash: "",
      isError: false,
      message: "",
      show: false,
    },
    metas: [],
    hamContract: null,
    hamContractSigner: null,
    txHash: "",
  },
  setContextState: (state: Context) => {},
};

const AppContext = createContext(initialContext);

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContextState] = useState(initialContext.contextState);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
