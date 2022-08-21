import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matchesService from "./matchesService";

const initialState = {
  matches: [],
  matches_isError: false,
  matches_isSuccess: false,
  matches_isLoading: false,
  matches_message: "",
};

export const getMatch = createAsyncThunk(
  "matches/getMatch",
  async (match_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matchesService.getMatch(match_id, token); //SERVICE
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

export const getMatches = createAsyncThunk(
  "matches/getMatches",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matchesService.getMatches(token); //SERVICE
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

export const updateMatch = createAsyncThunk(
  "matches/updateMatch",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matchesService.loadPlayers(payload, token); //SERVICE
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

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    //ACTION: Resets all state
    resetMatches: (state) => {
      state.matches = [];
      state.matches_isError = false;
      state.matches_isSuccess = false;
      state.matches_isLoading = false;
      state.matches_message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMatch.pending, (state) => {
        state.matches_isLoading = true;
      })
      .addCase(updateMatch.fulfilled, (state, action) => {
        state.matches_isLoading = false;
        state.matches_isSuccess = true;
        state.matches_message = action.payload;
      })
      .addCase(updateMatch.rejected, (state, action) => {
        state.matches_isLoading = false;
        state.matches_isError = true;
        state.matches_message = action.payload;
      });
  },
});

export const { resetMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
