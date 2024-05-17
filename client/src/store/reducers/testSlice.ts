
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: null | string;
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:  PayloadAction<string>) {
            state.user = action.payload
        },
        clearUser(state){
            state.user = null;
        },
        updateUser(state, action: PayloadAction<string>) {
            if(state.user){
                state.user = action.payload
            }
        }
    }
})

export const {setUser, clearUser, updateUser} = userSlice.actions;
export default userSlice.reducer;