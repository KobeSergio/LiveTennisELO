import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "./apiService";

const initialState = {
  players: [],
  player_matches: [],
  player_details: [],
  player_records: [],
  records: [],
  choices: [],
  latest: null,
  beforeLast: null,
  api_isError: false,
  api_isSuccess: false,
  api_isLoading: false,
  api_message: "",
};

export const loadData = createAsyncThunk("api/loadData", async (thunkAPI) => {
  try {
    return await apiService.loadData(); //SERVICE
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    //ACTION: Resets all state
    resetApi: (state) => {
      state.players = [];
      state.player_matches = [];
      state.player_details = [];
      state.player_records = [];
      state.records = [];
      state.choices = [];
      state.latest = null;
      state.beforeLast = null;
      state.api_isError = false;
      state.api_isSuccess = false;
      state.api_isLoading = false;
      state.api_message = "";
    },
    resetMarkers: (state) => {
      state.api_isError = false;
      state.api_isSuccess = false;
      state.api_isLoading = false;
      state.api_message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.latest = action.payload.latest.record.doc_date;
        state.choices = action.payload.latest.records;
        state.beforeLast = action.payload.beforeLatest;
        state.records = action.payload.loadData;
        state.players = action.payload.players;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      });
  },
});
export const { resetApi, resetMarkers } = apiSlice.actions;
export default apiSlice.reducer;
