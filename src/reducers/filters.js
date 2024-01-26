const initialState = {
    filters: [],
    activeFilter: "all"
}

const filters = (state = initialState, action) => {
    switch (action.type) {
               case 'FILTERS_ADDED':
            return {
                ...state,
                filters: action.payload
            }
        case 'ACTIVE_FILTER_ADDED':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state

    }
}

export default filters;