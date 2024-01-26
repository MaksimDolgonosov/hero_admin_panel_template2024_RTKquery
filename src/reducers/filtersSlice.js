import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
//import { fetchFilters } from "../actions";
import { useHttp } from "../hooks/http.hook";

// const initialState = {
//     filters: [],
//     activeFilter: "all"
// }
const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    activeFilter: "all"
})
// export const fetchFilters = (request) => (dispatch) => {
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersAdded(data)))
// }

export const fetchFilters = createAsyncThunk(
    "filters/fetchFilters",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters");
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // filtersAdded: (state, action) => {
        //     state.filters = action.payload
        // },
        activeFiltersAdded: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {
                //state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload)
            })
    }
})

const { actions, reducer } = filtersSlice;
export default reducer;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
export const { filtersAdded, activeFiltersAdded } = actions;