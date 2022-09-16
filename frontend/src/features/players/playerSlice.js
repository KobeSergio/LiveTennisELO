import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playersService from "./playersService";

const initialState = {
  player_details: [],
  player_matches: [],
  player_records: [],
  player_isError: false,
  player_isSuccess: false,
  player_isLoading: false,
  player_message: "",
};

//Load players
// @http:   GET admin/players/
// @res:    players: json
export const loadPlayer = createAsyncThunk(
  "player/loadPlayer",
  async (player_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await playersService.loadPlayer(player_id, token); //SERVICE
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

//Update player
// @http:   PUT admin/players/:player_id
// @res:    updatedPlayer: json
export const updatePlayer = createAsyncThunk(
  "player/updatePlayer",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; 
      return await playersService.updatePlayer(payload, token); //SERVICE
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

//TEMP Insert highlight
// @http:   PUT admin/matches/:match_id
// @res:    updateMatch: json
export const insertHighlight = createAsyncThunk(
  "player/insertHighlight",
  async (payload, thunkAPI) => {
    try { 
      const token = thunkAPI.getState().auth.user.token;
      return await playersService.insertHighlight(payload, token); //SERVICE
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

//Delete player
// @http:   DELETE admin/players/:player_id
// @res:    updatedPlayer: json
export const deletePlayer = createAsyncThunk(
  "player/deletePlayer",
  async (player_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; 
      return await playersService.deletePlayer(player_id, token); //SERVICE
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

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    //ACTION: Resets all state
    resetPlayer: (state) => {
      state.player_details = [];
      state.player_matches = [];
      state.player_records = [];
      state.player_isError = false;
      state.player_isSuccess = false;
      state.player_isLoading = false;
      state.player_message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayer.pending, (state) => {
        state.player_isLoading = true;
      })
      .addCase(loadPlayer.fulfilled, (state, action) => {
        state.player_isLoading = false;
        state.player_isSuccess = true;
        state.player_details = action.payload.player; 
        state.player_matches = action.payload.matches;
        state.player_records = action.payload.records;
      })
      .addCase(loadPlayer.rejected, (state, action) => {
        state.player_isLoading = false;
        state.player_isError = true;
        state.player_message = action.payload;
      })
      .addCase(updatePlayer.pending, (state) => {
        state.player_isLoading = true;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.player_isLoading = false;
        state.player_isSuccess = true;
        state.player_details = action.payload;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.player_isLoading = false;
        state.player_isError = true;
        state.player_message = action.payload;
      })
      .addCase(insertHighlight.pending, (state) => {
        state.player_isLoading = true;
      })
      .addCase(insertHighlight.fulfilled, (state, action) => {
        state.player_isLoading = false;
        state.player_isSuccess = true;
        state.player_message = action.payload;
      })
      .addCase(insertHighlight.rejected, (state, action) => {
        state.player_isLoading = false;
        state.player_isError = true;
        state.player_message = action.payload;
      })
      .addCase(deletePlayer.pending, (state) => {
        state.player_isLoading = true;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.player_isLoading = false;
        state.player_isSuccess = true;
        state.player_message = action.payload;
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.player_isLoading = false;
        state.player_isError = true;
        state.player_message = action.payload;
      });
  },
});

export const { resetPlayer } = playerSlice.actions;
export default playerSlice.reducer;
