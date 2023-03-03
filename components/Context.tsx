import { User } from "firebase/auth";
import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";
import { CartProduct, Product } from "../utils/types/Product";

type GlobalState = any;
type GlobalAction = { type: string; payload?: any };

export const ACTIONS = {
  AUTH: "auth",
  USER: "user",
  SNACKBAR: "snackbar",
};

const GlobalStateContext = createContext<GlobalState>(0);
const GlobalDispatchContext = createContext<Dispatch<GlobalAction>>(() => null);

const reducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case ACTIONS.AUTH: {
      return { ...state, auth: action.payload };
    }

    case ACTIONS.USER: {
      return { ...state, user: action.payload };
    }

    // case ACTIONS.SNACKBAR: {
    //   if (typeof action.payload !== "string") {
    //     return state;
    //   }
    //   return { ...state, snackBar: action.payload };
    // }
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

type GlobalProviderProps = {
  children: ReactNode;
  initialState?: {
    auth: User;
    snackBar: string;
    cart: Product[];
    user: { cart: CartProduct[]; wishlist: Product[] };
  };
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  //initialState
  const initialState = {
    auth: {},
    user: {
      id: 0,
      phone: [],
      address: [],
      cart: [],
      wishlist: [],
      email: "",
      gender: "",
      name: "",
      purchasedItems: [],
    },
    snackBar: {},
    cart: [],
  };

  //initializing useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useDispatchGlobalState = () => useContext(GlobalDispatchContext);
