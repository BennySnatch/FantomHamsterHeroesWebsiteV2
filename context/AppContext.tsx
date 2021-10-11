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
  showPopup: boolean;
  isPaused: boolean;
  addr: string;
  price: any;
  currentSupply: number;
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
    addr: "",
    price: 0,
    currentSupply: 0,
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
