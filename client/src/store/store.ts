import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"


export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
    reducer: {
        user: userSlice
    }
})