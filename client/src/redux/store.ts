import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "@/redux/services/api"
import sidebarSlice from "./state/sidebarSlice"
import authSlice from "./state/authSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { usersApiSlice } from "./services/usersApiSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [usersApiSlice .reducerPath]: usersApiSlice .reducer,
    [authSlice.name]: authSlice.reducer,
    [sidebarSlice.name]: sidebarSlice.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware, usersApiSlice .middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
