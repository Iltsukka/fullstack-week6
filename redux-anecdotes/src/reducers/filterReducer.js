import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        handleFilter(state, action) {
            const content = action.payload
            return content
        }
    }
})

/* const filterReducer = (state = 'ALL', action) => {
    console.log('state now', state)
    console.log('action', action)

    switch(action.type) {
        case('FILTER'): {
            return action.payload
        }
        default:
            return state
    }
}
 */
/* export const handleFilter = (content) => {
    return {
        type: 'FILTER',
        payload: content
    }
} */
export const {handleFilter} = filterSlice.actions
export default filterSlice.reducer