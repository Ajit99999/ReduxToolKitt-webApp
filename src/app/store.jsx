import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postSlice from "./PostSlice";
import cartSlice from "./CartSlice";
export const store = configureStore({
  reducer: {
   cart:  cartSlice,
   post : postSlice
  },
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

