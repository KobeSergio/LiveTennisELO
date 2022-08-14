import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playersService from "./playersService";

const initialState = {
  players: [],
  players_isError: false,
  players_isSuccess: false,
  players_isLoading: false,
  players_message: "",
};

//Load record
// @http:   GET admin/players/
// @res:    players: json
export const loadPlayers = createAsyncThunk(
  "players/loadPlayers",
  async (_, thunkAPI) => {
    try {  
      const token = thunkAPI.getState().auth.user.token;
      return await playersService.loadPlayers(token); //SERVICE
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    //ACTION: Resets all state
    resetPlayers: (state) => {
      state.players = [];
      state.players_isError = false;
      state.players_isSuccess = false;
      state.players_isLoading = false;
      state.players_message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayers.pending, (state) => {
        state.players_isLoading = true;
      })
      .addCase(loadPlayers.fulfilled, (state, action) => {
        state.players_isLoading = false;
        state.players_isSuccess = true;
        state.players = action.payload;
      })
      .addCase(loadPlayers.rejected, (state, action) => {
        state.players_isLoading = false;
        state.players_isError = true;
        state.players_message = action.payload;
      });
  },
});

export const { resetPlayers } = playersSlice.actions;
export default playersSlice.reducer;
