import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type UserInfo = {
  accessToken: string | null
  _id: string | null
  name: string | null
  email: string | null
  isLoggedIn: boolean
}

export type InitialStateProps = {
  userInfo: UserInfo
}

const initialState: InitialStateProps = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : {
        accessToken: null,
        _id: null,
        name: null,
        email: null,
        isLoggedIn: false,
      },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo._id = action.payload._id
      state.userInfo.accessToken = action.payload.accessToken
      state.userInfo.email = action.payload.email
      state.userInfo.name = action.payload.name
      state.userInfo.isLoggedIn= true

      localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    logout: (state) => {
      state.userInfo._id = null
      state.userInfo.accessToken = null
      state.userInfo.email = null
      state.userInfo.name = null
      state.userInfo.isLoggedIn = false
      localStorage.removeItem("userInfo")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice
