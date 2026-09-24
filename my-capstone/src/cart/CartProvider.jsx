import { useReducer, useMemo } from "react";
import useCartStore from "../store/useCartStore";

const initialState = {
  items: [], // [{ ...dish, qty }]
};

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { dish } = action;
      const existing = state.items.find((i) => i.id === dish.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { ...dish, qty: 1 }] };
    }

    case "remove": {
      const { id } = action;
      return { ...state, items: state.items.filter((i) => i.id !== id) };
    }

    case "increment": {
      const { id } = action;
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i,
        ),
      };
    }

    case "decrement": {
      const { id } = action;
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    }

    case "setQty": {
      const { id, qty } = action;
      if (qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }

    case "clear":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const total = state.items.reduce(
      (sum, i) => sum + (i.price ?? i.priceETB ?? 0) * i.qty,
      0,
    );
    const count = state.items.reduce((sum, i) => sum + i.qty, 0);

    return {
      items: state.items,
      dispatch,
      total,
      count,
    };
  }, [state]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
