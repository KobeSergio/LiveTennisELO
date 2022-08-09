import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recordsService from "./recordsService";

const initialState = {
  records: [],
  latest: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDeleted: false,
  message: "",
};

//Load record
// @http:   GET admin/:doc_date
// @res:    admin: json
export const loadRecord = createAsyncThunk(
  "records/loadRecord",
  async (doc_date, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordsService.loadRecord(doc_date, token); //SERVICE
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

//Load latest record
// @http:   GET admin/
// @res:    admin: json
export const latestRecord = createAsyncThunk(
  "records/latestRecord",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordsService.latestRecord(token); //SERVICE
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

//Delete individual record.
// @params: Record._id
export const deleteIndRecord = createAsyncThunk(
  "records/deleteIndividual",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordsService.deleteIndRecord(id, token);
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

//Delete individual record.
// @params: Record._id
export const deleteRecord = createAsyncThunk(
  "records/deleteRecord",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordsService.deleteRecord(id, token);
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

//Update record
// @http:   PUT admin/:doc_date/:id
// @res:    admin: json
export const updateRecord = createAsyncThunk(
  "records/updateRecord",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordsService.updateRecord(payload, token); //SERVICE
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

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    //ACTION: Resets all state
    resetRecords: (state) => {
      state.records = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isDeleted = false;
      state.message = "";
    },
    resetStatus: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isDeleted = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records[0] = action.payload;
      })
      .addCase(loadRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records[0] = action.payload[1];
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(latestRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(latestRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latest = action.payload;
      })
      .addCase(latestRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIndRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIndRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records[0] = state.records[0].filter(
          (record) => record._id !== action.payload.id
        );
      })
      .addCase(deleteIndRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleted = true;
      });
  },
});

export const { resetRecords, resetStatus } = recordsSlice.actions;
export default recordsSlice.reducer;
