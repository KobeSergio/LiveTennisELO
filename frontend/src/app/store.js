import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recordsReducer from "../features/records/recordsSlice";
import playersReducer from "../features/players/playersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    records: recordsReducer,
    players: playersReducer,
  },
});
