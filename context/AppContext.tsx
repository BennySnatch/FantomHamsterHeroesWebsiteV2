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

type Context = {
  isLoading: boolean;
  isFantom: boolean;
  showPopup: boolean;
  isPaused: boolean;
  addr: string;
  price: any;
  currentSupply: number;
  isConnected: boolean;
  metas: any;
  macawContract: any;
  macawContractSigner: any;
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
    metas: [],
    macawContract: null,
    macawContractSigner: null,
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
