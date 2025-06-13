import { configureStore } from "@reduxjs/toolkit";
import FilmSlice from "../slices/FilmSlice";

const store = configureStore({
  reducer: {
    film: FilmSlice.reducer,
  },
});

export default store;
