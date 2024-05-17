import { User } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
    user: null | User;
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:  PayloadAction<User>) {
            state.user = action.payload
        },
        clearUser(state){
            state.user = null;
        },
        updateUser(state, action: PayloadAction<User>) {
            if(state.user){
                state.user = {
                    ...state.user,
                    ...action.payload
                }
            }
        }
    }
})


export const userSliceSelector = (store: RootState) => store.user
export const {setUser, clearUser, updateUser} = userSlice.actions;
export default userSlice.reducer;