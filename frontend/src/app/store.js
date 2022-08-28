import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recordsReducer from "../features/records/recordsSlice";
import playersReducer from "../features/players/playersSlice";
import playerReducer from "../features/players/playerSlice";
import matchesReducer from "../features/matches/matchesSlice";
import apiReducer from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    records: recordsReducer,
    players: playersReducer,
    player: playerReducer,
    matches: matchesReducer,
    api: apiReducer,
  },
});
