

const filterReducer = (state = 'ALL', action) => {
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

export const handleFilter = (content) => {
    return {
        type: 'FILTER',
        payload: content
    }
}

export default filterReducer