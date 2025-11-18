import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  roll: string;
  img: string;
  prise: number;  // দাম প্রতি ইউনিটের
  qty: number;    // কতটি প্রোডাক্ট নেওয়া হয়েছে
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.qty += 1;  // পরিমাণ বাড়াও
        // মোট দাম আবার হিসাব করো (per unit prise * qty)
        item.prise = action.payload.prise * item.qty;
      } else {
        state.items.push({ ...action.payload, qty: 1 }); // qty 1 সহ নতুন আইটেম
      }
    },

    increment: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.qty++;
        item.prise = item.prise / (item.qty - 1) * item.qty; // দাম আপডেট
      }
    },

    decrement: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty--;
        item.prise = item.prise / (item.qty + 1) * item.qty; // দাম আপডেট
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
