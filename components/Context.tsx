import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  useEffect,
  useMemo,
} from "react";
import { parseLocalAuth, encLocalAuth } from "../utils/auth";

type GlobalState = any;
type GlobalAction = { type: string; payload?: any };

export const ACTIONS = {
  AUTH: "auth",
  ADD_TO_CART: "add_cart",
  REMOVE_FROM_CART: "remove_cart",
  ADD_TO_CHECKOUT: "buy_now",
  REMOVE_FROM_CHECKOUT: "remove_from_buy_now",
  UPDATE_CHECKOUT: "update_checkout",
  ADD_TO_WISHLIST: "add_to_wishlist",
  REMOVE_FROM_WISHLIST: "remove_from_wishlist",
};

const GlobalStateContext = createContext<GlobalState>(0);
const GlobalDispatchContext = createContext<Dispatch<GlobalAction>>(() => null);

const reducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case ACTIONS.AUTH: {
      let localState = { ...state, auth: action.payload };
      if (localState.auth) {
        localStorage.setItem(
          "auth",
          encLocalAuth(JSON.stringify(localState.auth))
        );
      } else {
        localStorage.setItem("auth", encLocalAuth(localState.auth));
      }
      // console.log(localState);
      return localState;
    }

    case ACTIONS.ADD_TO_CART: {
      let updatedState = [];
      if (state.cart.length === 0) {
        updatedState = { ...state, cart: [action.payload] };
      } else {
        const productAlreadyExists = state.cart.find(
          (product: any) => product.id === action.payload.id
        );
        console.log(productAlreadyExists);
        if (productAlreadyExists) {
          return state;
        }
        updatedState = { ...state, cart: [...state.cart, action.payload] };
      }
      localStorage.setItem("cart", JSON.stringify(updatedState.cart));
      return updatedState;
    }

    case ACTIONS.REMOVE_FROM_CART: {
      let product = state.cart?.find((i: any) => i?.id === action?.payload);
      let updatedState = [];
      if (state.cart?.length === 0) {
        return;
      } else {
        updatedState = {
          ...state,
          cart: state.cart.filter((i: any) => i.id !== product?.id),
        };
      }
      localStorage.setItem("cart", JSON.stringify(updatedState.cart));
      return updatedState;
    }

    case ACTIONS.ADD_TO_CHECKOUT: {
      const alreadyExists = state?.auth?.checkedOutItems?.find(
        (item: any) => item.id === action.payload.id
      );
      if (alreadyExists) {
        return state;
      }
      const updatedState = {
        ...state,
        auth: {
          ...state.auth,
          checkedOutItems: [
            ...state.auth.checkedOutItems,
            { ...action.payload, quantity: 1 },
          ],
        },
      };
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      return updatedState;
    }
    case ACTIONS.REMOVE_FROM_CHECKOUT: {
      const updatedCheckout = state.auth.checkedOutItems.filter(
        (item: any) => item.id !== action.payload
      );
      const updatedState = {
        ...state,
        auth: { ...state.auth, checkedOutItems: [...updatedCheckout] },
      };
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      return updatedState;
    }

    case ACTIONS.UPDATE_CHECKOUT: {
      const updatedState = {
        ...state,
        auth: {
          ...state.auth,
          checkedOutItems: [...action.payload],
        },
      };
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      return updatedState;
    }

    case ACTIONS.ADD_TO_WISHLIST: {
      const updatedState = {
        ...state,
        auth: {
          ...state.auth,
          wishlist: [...state.auth.wishlist, { id: action.payload }],
        },
      };
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      return updatedState;
    }

    case ACTIONS.REMOVE_FROM_WISHLIST: {
      const updatedWishlist = state.auth.wishlist.filter(
        (item: { id: number }) => item.id !== action.payload
      );
      const updatedState = {
        ...state,
        auth: { ...state.auth, wishlist: [...updatedWishlist] },
      };
      localStorage.setItem(
        "auth",
        encLocalAuth(JSON.stringify(updatedState.auth))
      );
      return updatedState;
    }
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

type GlobalProviderProps = {
  children: ReactNode;
  initialState?: any;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  //initialState
  const initialState = useMemo(() => {
    return { auth: "", cart: [] };
  }, []);
  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    let localAuth = localStorage.getItem("auth");
    if (localAuth) {
      initialState.auth = JSON.parse(parseLocalAuth(localAuth));
    }
    if (localCart) {
      initialState.cart = JSON.parse(String(localCart));
    }
  }, [initialState]);

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
