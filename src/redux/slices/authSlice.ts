
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode"

type TAuthType = {
  user: null | { email: string, role: "buyer" | "seller", userId: string },
  accessToken: null | string;
}

const initialState: TAuthType = {
  user: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {

    setUser: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;

      // decode and extract expiration for both tokens
      const decodedAccess: { exp: number } = jwtDecode(accessToken);
      const decodedRefresh: { exp: number } = jwtDecode(refreshToken);

      const nowInSeconds = Math.floor(Date.now() / 1000);

      const accessExpiresInDays = (decodedAccess.exp - nowInSeconds) / (60 * 60 * 24);
      const refreshExpiresInDays = (decodedRefresh.exp - nowInSeconds) / (60 * 60 * 24);

      console.log('accessExpiresInDays', accessExpiresInDays, 'refreshExpiresInDays', refreshExpiresInDays);

      // set cookies with exact expiry
      Cookies.set("unlekAccessToken", accessToken, {
        path: "/",
        expires: accessExpiresInDays
      });

      Cookies.set("unlekRefreshToken", refreshToken, {
        path: "/",
        expires: refreshExpiresInDays
      });
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      // Remove token for cookies
      Cookies.remove("unlekAccessToken", { path: "/" });
      Cookies.remove("unlekRefreshToken", { path: "/" });
    }
  }
})

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.accessToken;