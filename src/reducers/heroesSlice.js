import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',

// }

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})


// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError))
// }

export const fetchHeroes = createAsyncThunk(
    "heroes/fetchHeroes",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes");
    }
)


const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        // heroesFetching: (state) => { state.heroesLoadingStatus = "loading" },
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = "idle";
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: (state) => { state.heroesLoadingStatus = "Error" },
        heroAdded: (state, action) => {
            //state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload)
        },
        heroDeleted: (state, action) => {
            //state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
            heroesAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => { state.heroesLoadingStatus = "loading" })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                //state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, (state) => { state.heroesLoadingStatus = "Error" })
            .addDefaultCase(() => { })
    }
})

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

const { actions, reducer } = heroesSlice;
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdded,
    heroDeleted
} = actions;