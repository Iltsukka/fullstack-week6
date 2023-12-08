import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'This is initialState of notificationSlice',
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            console.log(action)
            return message
        }
    }
})

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer