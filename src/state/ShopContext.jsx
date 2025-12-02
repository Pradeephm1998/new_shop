import { createContext, useContext, useReducer } from "react";
import { shops as dummyShops } from "../data/dummyData.js";

const ShopContext = createContext(null);

const initialState = {
  shops: dummyShops,
  cart: { items: [] },
  orders: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existing = state.cart.items.find(
        (i) => i.productId === item.productId && i.shopId === item.shopId
      );
      let newItems;
      if (existing) {
        newItems = state.cart.items.map((i) =>
          i.productId === item.productId && i.shopId === item.shopId
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        newItems = [...state.cart.items, { ...item, qty: 1 }];
      }
      return { ...state, cart: { items: newItems } };
    }
    case "REMOVE_FROM_CART": {
      const { productId, shopId } = action.payload;
      const newItems = state.cart.items
        .map((i) =>
          i.productId === productId && i.shopId === shopId
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0);
      return { ...state, cart: { items: newItems } };
    }
    case "CLEAR_CART":
      return { ...state, cart: { items: [] } };
    case "PLACE_ORDER": {
      if (state.cart.items.length === 0) return state;
      const totalAmount = state.cart.items.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
      );
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: state.cart.items,
        totalAmount,
        status: "PLACED",
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        orders: [newOrder, ...state.orders],
        cart: { items: [] },
      };
    }
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    shops: state.shops,
    cart: state.cart,
    orders: state.orders,
    addToCart: (payload) => dispatch({ type: "ADD_TO_CART", payload }),
    removeFromCart: (payload) =>
      dispatch({ type: "REMOVE_FROM_CART", payload }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    placeOrder: () => dispatch({ type: "PLACE_ORDER" }),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
