import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../features/user/userSlice"
import TrampolineReducer from "../features/trampoline/trampolineSlice"
import rentReducer from "../features/rents/rentSlice"
export const store = configureStore({
    reducer: {
        user: UserReducer,
        trampoline: TrampolineReducer,
        rent: rentReducer
    },
})