import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recordsService from "./recordsService"; 
import { useNavigate } from "react-router-dom";

const initialState = {
  records: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Load record, if no id presented, redirect to latest doc_date.
// @http:   GET admin/ or GET admin/:doc_date
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

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    //ACTION: Resets all state
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records.push(action.payload);
      })
      .addCase(loadRecord.rejected, (state, action) => {
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
        state.records = state.records.filter(
          (record) => record._id !== action.payload.id
        )
      })
      .addCase(deleteIndRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recordsSlice.actions;
export default recordsSlice.reducer;
