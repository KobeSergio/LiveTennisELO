import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import authService from "./authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //If user is present, use user. Else null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// // Register User
// export const register = createAsyncThunk(
//   "auth/register",
//   async (user, thunkAPI) => {
//     try {
//       return await authService.register(user); //SERVICE
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Login User
export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user); //SERVICE
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

//Logout User
export const logout = createAsyncThunk('auth/logout', async()=>{
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //ACTION: Resets all state
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(register.pending, (state) => {
      //   //REDUCER
      //   state.isLoading = true;
      // })
      // .addCase(register.fulfilled, (state, action) => {
      //   //REDUCER
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.user = null;
      // })
      .addCase(login.pending, (state) => {
        //REDUCER
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        //REDUCER
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      }).addCase(logout.fulfilled, (state) => { 
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
