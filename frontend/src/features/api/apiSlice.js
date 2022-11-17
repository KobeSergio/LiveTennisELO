import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "./apiService";

const initialState = {
  players: [],
  player_matches: [],
  player_details: [],
  player_records: [],
  top_players: [],
  records: [],
  choices: [],
  tournaments: [],
  tournament_matches: [],
  H2H: null,
  charts: null,
  latest: null,
  api_isError: false,
  api_isSuccess: false,
  api_isLoading: false,
  api_message: "",
};
export const loadTournament = createAsyncThunk(
  "api/tournament",
  async (tourney_id, thunkAPI) => { 
    try {
      return await apiService.loadTournament(tourney_id);
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

export const loadTournaments = createAsyncThunk(
  "api/tournaments",
  async (thunkAPI) => {
    try {
      return await apiService.loadTournaments();
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

export const loadRecord = createAsyncThunk(
  "api/loadRecord",
  async (record, thunkAPI) => {
    try {
      return await apiService.loadRecord(record); //SERVICE
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

export const drawChart = createAsyncThunk(
  "api/drawChart",
  async (players, thunkAPI) => {
    try {
      return await apiService.drawChart(players); //SERVICE
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

export const getH2H = createAsyncThunk(
  "api/getH2H",
  async (players, thunkAPI) => {
    try {
      return await apiService.getH2H(players); //SERVICE
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

//Load players
// @http:   GET /players/:id
// @res:    players: json
export const loadPlayer = createAsyncThunk(
  "api/loadPlayer",
  async (player_id, thunkAPI) => {
    try {
      return await apiService.loadPlayer(player_id); //SERVICE
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

//Load players
// @http:   GET /players/:id
// @res:    players: json
export const loadPlayerList = createAsyncThunk(
  "api/loadPlayerList",
  async (_, thunkAPI) => {
    try {
      return await apiService.loadPlayerList(); //SERVICE
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

//Load players
// @http:   GET /players/:id
// @res:    players: json
export const loadPlayers = createAsyncThunk(
  "api/loadPlayers",
  async (_, thunkAPI) => {
    try {
      return await apiService.loadPlayers(); //SERVICE
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
      state.tournaments = [];
      state.tournament_matches = [];
      state.latest = null;
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
    resetPlayer: (state) => {
      state.player_details = [];
      state.player_matches = [];
      state.player_records = [];
    },
    resetRecords: (state) => {
      state.records = [];
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
        state.records = action.payload.loadData;
        state.top_players = action.payload.players;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadPlayers.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadPlayers.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.top_players = action.payload;
      })
      .addCase(loadPlayers.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadRecord.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadRecord.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.records = action.payload.loadData;
      })
      .addCase(loadRecord.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(drawChart.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(drawChart.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.charts = action.payload;
      })
      .addCase(drawChart.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(getH2H.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(getH2H.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.H2H = action.payload;
      })
      .addCase(getH2H.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadPlayer.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadPlayer.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.player_details = action.payload.player;
        state.player_matches = action.payload.matches;
        state.player_records = action.payload.records;
      })
      .addCase(loadPlayer.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadPlayerList.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadPlayerList.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.players = action.payload;
      })
      .addCase(loadPlayerList.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadTournaments.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadTournaments.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.tournaments = action.payload;
      })
      .addCase(loadTournaments.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      })
      .addCase(loadTournament.pending, (state) => {
        state.api_isLoading = true;
      })
      .addCase(loadTournament.fulfilled, (state, action) => {
        state.api_isLoading = false;
        state.api_isSuccess = true;
        state.tournament_matches = action.payload;
      })
      .addCase(loadTournament.rejected, (state, action) => {
        state.api_isLoading = false;
        state.api_isError = true;
        state.api_message = action.payload;
      });
  },
});
export const { resetApi, resetMarkers, resetPlayer, resetRecords } =
  apiSlice.actions;
export default apiSlice.reducer;
