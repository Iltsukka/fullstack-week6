import { createSlice } from "@reduxjs/toolkit";

const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            return message
        },
        disableNotification() {
            return null
        }
    }
})

export const {setNotification, disableNotification} = notificationSlice.actions
export default notificationSlice.reducer